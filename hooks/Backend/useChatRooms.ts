import { useEffect, useState } from 'react';
import { db, firebaseAuth, serverTimestamp } from '@/lib/firebase';
import { ChatRoom, FirestoreMessage } from '@/interfaces/messagesProps';
import { getLastMessage } from '@/utils/getLastMessage';

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return setLoading(false);

    // Listener utama untuk chatRooms user
    const unsubscribeRooms = db
      .collection('chatRooms')
      .where('peserta', 'array-contains', userId)
      .orderBy('terakhirDiperbarui', 'desc')
      .onSnapshot((snapshot) => {
        const roomsData: ChatRoom[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ChatRoom, 'id'>),
          pesanTerakhir: '',
          unreadCount: 0,
        }));
        setChatRooms(roomsData);

        // Pasang listener untuk pesan setiap room
        roomsData.forEach((room) => {
          const unsubscribePesan = db
            .collection('chatRooms')
            .doc(room.id)
            .collection('pesan')
            .orderBy('waktu', 'desc')
            .onSnapshot((pesanSnap) => {
              const pesanArr = pesanSnap.docs.map(
                (d) => ({ id: d.id, ...d.data() }) as FirestoreMessage
              );
              const lastPesan = pesanArr[0];
              const pesanTerakhir = lastPesan
                ? getLastMessage(lastPesan)
                : 'Belum ada chat di stasiun ini.';
              const unreadCount = pesanArr.filter(
                (p) => !p.sudahDibaca && p.idPengirim !== userId
              ).length;

              setChatRooms((prev) =>
                prev.map((r) =>
                  r.id === room.id ? { ...r, pesanTerakhir, unreadCount } : r
                )
              );
            });

          // Cleanup listener saat unmount
          return () => unsubscribePesan();
        });

        setLoading(false);
      });

    return () => {
      unsubscribeRooms();
    };
  }, [userId]);

  const markMessagesAsRead = async (roomId: string) => {
    if (!userId) return;
    const pesanRef = db.collection('chatRooms').doc(roomId).collection('pesan');
    const snapshot = await pesanRef.get();
    const batch = db.batch();
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.idPengirim !== userId && !data.sudahDibaca) {
        batch.update(doc.ref, { sudahDibaca: true });
      }
    });
    await batch.commit();
    setChatRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    );
  };

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
      instansi: station.instansi,
      peserta: [userId],
      tipePeserta: [profileTipe],
      pesanTerakhir: '',
      terakhirDiperbarui: serverTimestamp(),
    });
    return newRoomRef.id;
  };

  return { chatRooms, loading, markMessagesAsRead, createRoomIfNotExist };
};
