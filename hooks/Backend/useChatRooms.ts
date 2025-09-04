import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, firebaseAuth, serverTimestamp } from '@/lib/firebase';

// OUR INTERFACES
import { ChatRoom } from '@/interfaces/messagesProps';

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRead, setLastRead] = useState<
    Record<string, Record<string, number>>
  >({});
  const lastReadRef = useRef<Record<string, Record<string, number>>>({});
  const userId = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    AsyncStorage.getItem('lastRead').then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        setLastRead(parsed);
        lastReadRef.current = parsed;
      }
    });
  }, []);

  useEffect(() => {
    if (!userId) return setLoading(false);

    const unsubscribe = db
      .collection('chatRooms')
      .where('peserta', 'array-contains', userId)
      .orderBy('terakhirDiperbarui', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Omit<ChatRoom, 'id'>;

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

                // ✅ Hitung unreadCount berdasarkan sudahDibaca
                unreadCount = pesanSnap.docs.filter(
                  (p) =>
                    p.data().sudahDibaca === false &&
                    p.data().idPengirim !== userId
                ).length;
              }

              setChatRooms((prev) => {
                const otherRooms = prev.filter((r) => r.id !== doc.id);
                return [
                  { id: doc.id, ...data, pesanTerakhir, unreadCount },
                  ...otherRooms,
                ];
              });
            });
        });
        setLoading(false);
      });

    return () => unsubscribe();
  }, [userId]);

  // ✅ Fungsi buat tandai semua pesan di room ini sudah dibaca
  const markMessagesAsRead = async (roomId: string) => {
    if (!userId) return;

    const pesanRef = db.collection('chatRooms').doc(roomId).collection('pesan');
    const snapshot = await pesanRef.get(); // 🔥 ambil semua pesan

    const batch = db.batch();
    snapshot.forEach((doc) => {
      const data = doc.data();
      // filter di client aja
      if (data.idPengirim !== userId && data.sudahDibaca === false) {
        batch.update(doc.ref, { sudahDibaca: true });
      }
    });

    await batch.commit();

    // update state supaya unreadCount langsung 0
    setChatRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
  };

  // ✅ Fungsi buat room baru
  const createRoomIfNotExist = async (
    station: { name: string; instansi: string },
    profileTipe: string
  ) => {
    if (!userId) return '';
    const existingRoom = chatRooms.find(
      (r) => r.roomChat.toLowerCase() === station.name.toLowerCase()
    );
    if (existingRoom?.id) return existingRoom.id;
    const newRoomRef = db.collection('chatRooms').doc();
    await newRoomRef.set({
      roomChat: station.name,
      Instansi: station.instansi,
      peserta: [userId],
      tipePeserta: [profileTipe],
      pesanTerakhir: '',
      terakhirDiperbarui: serverTimestamp(),
    });
    return newRoomRef.id;
  };

  return {
    chatRooms,
    loading,
    markMessagesAsRead,
    createRoomIfNotExist,
    lastRead,
  };
};
