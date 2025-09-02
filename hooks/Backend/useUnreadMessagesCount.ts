import { useEffect, useState } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';

export function useUnreadMessagesCount() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (!user) return;

    // console.log('✅ Listen unread khusus admin untuk user:', user.uid);

    // simpan unsubscribe per room
    let unsubMessages: (() => void)[] = [];

    // listen semua room
    const unsubscribeRooms = db
      .collection('chatRooms')
      .onSnapshot((roomSnap) => {
        // cleanup listener lama
        unsubMessages.forEach((fn) => fn());
        unsubMessages = [];

        // buat map untuk nyimpen unread per-room
        const roomUnread: Record<string, number> = {};

        roomSnap.docs.forEach((roomDoc) => {
          const unsub = db
            .collection('chatRooms')
            .doc(roomDoc.id)
            .collection('pesan')
            .where('sudahDibaca', '==', false)
            .onSnapshot((pesanSnap) => {
              const unreadAdmin = pesanSnap.docs.filter(
                (doc) => doc.data().tipePengirim === 'admin'
              ).length;

              // console.log(
              //   `   🔎 Room ${roomDoc.id} ada ${unreadAdmin} pesan admin belum dibaca`
              // );

              // update map dengan count terbaru
              roomUnread[roomDoc.id] = unreadAdmin;

              // hitung ulang total dari semua room
              const total = Object.values(roomUnread).reduce(
                (a, b) => a + b,
                0
              );
              // console.log('📊 Total unread (admin only):', total);
              setUnreadCount(total);
            });

          unsubMessages.push(unsub);
        });
      });

    return () => {
      unsubscribeRooms();
      unsubMessages.forEach((fn) => fn());
    };
  }, []);

  return { unreadCount };
}
