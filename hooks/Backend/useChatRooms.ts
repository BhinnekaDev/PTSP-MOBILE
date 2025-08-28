import { useEffect, useState, useRef } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ChatRoom {
  id: string;
  roomChat: string;
  pesanTerakhir: string;
  peserta: string[];
  instansi?: string;
  terakhirDiperbarui: any;
  tipePeserta?: string[];
  unreadCount?: number;
}

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRead, setLastRead] = useState<
    Record<string, Record<string, number>>
  >({});
  const lastReadRef = useRef<Record<string, Record<string, number>>>({});

  const userId = firebaseAuth.currentUser?.uid;

  // Ambil lastRead dari AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('lastRead').then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        setLastRead(parsed);
        lastReadRef.current = parsed;
        console.log('✅ Loaded lastRead from AsyncStorage:', parsed);
      } else {
        console.log('ℹ️ No lastRead data found in AsyncStorage');
      }
    });
  }, []);

  // Listener chatRooms
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const unsubscribe = db
      .collection('chatRooms')
      .where('peserta', 'array-contains', userId)
      .orderBy('terakhirDiperbarui', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Omit<ChatRoom, 'id'>;

          // Listener pesan
          db.collection('chatRooms')
            .doc(doc.id)
            .collection('pesan')
            .orderBy('waktu', 'desc')
            .onSnapshot((pesanSnap) => {
              let pesanTerakhir = 'Belum ada chat di stasiun ini.';
              let unreadCount = 0;

              if (!pesanSnap.empty) {
                pesanTerakhir =
                  pesanSnap.docs[0].data().isi || 'Pesan tanpa teks';

                // Ambil lastRead untuk user + room
                const userLastRead = lastReadRef.current[userId]?.[doc.id] || 0;

                unreadCount = pesanSnap.docs.filter(
                  (p) =>
                    p.data().waktu?.toMillis?.() > userLastRead &&
                    p.data().idPengirim !== userId // hanya hitung pesan dari orang lain
                ).length;
              }
              console.log(
                'Room:',
                doc.id,
                'UnreadCount:',
                unreadCount,
                'LastReadRef:',
                lastReadRef.current[userId]?.[doc.id]
              );

              setChatRooms((prev) => {
                const otherRooms = prev.filter((r) => r.id !== doc.id);
                return [
                  {
                    id: doc.id,
                    ...data,
                    pesanTerakhir,
                    unreadCount,
                  },
                  ...otherRooms,
                ].sort(
                  (a, b) =>
                    b.terakhirDiperbarui?.seconds -
                    a.terakhirDiperbarui?.seconds
                );
              });
            });
        });

        setLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  // markAsRead
  const markAsRead = async (roomId: string) => {
    if (!userId) return;
    const now = Date.now();
    const newLastRead = { ...lastRead };
    if (!newLastRead[userId]) newLastRead[userId] = {};
    newLastRead[userId][roomId] = now;

    setLastRead(newLastRead);
    lastReadRef.current = newLastRead;

    await AsyncStorage.setItem('lastRead', JSON.stringify(newLastRead));

    console.log('✅ markAsRead:', roomId, 'newLastRead:', newLastRead);

    setChatRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
  };

  return { chatRooms, loading, markAsRead };
};
