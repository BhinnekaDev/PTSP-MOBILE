import { useEffect, useState } from 'react';
import { db, firebaseAuth, serverTimestamp } from '@/lib/firebase';
import { FirestoreMessage } from '@/interfaces/messagesProps';

export const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<FirestoreMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = db
      .collection('chatRooms')
      .doc(roomId)
      .collection('pesan')
      .orderBy('waktu', 'asc')
      .onSnapshot((snapshot) => {
        const msgs: FirestoreMessage[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<FirestoreMessage, 'id'>;
          return { id: doc.id, ...data };
        });

        setMessages(msgs);
        setLoading(false);

        // Tandai pesan yang belum dibaca oleh user ini
        msgs.forEach(async (msg) => {
          if (msg.idPengirim !== currentUserId && msg.sudahDibaca !== true) {
            await db
              .collection('chatRooms')
              .doc(roomId)
              .collection('pesan')
              .doc(msg.id)
              .update({ sudahDibaca: true });
          }
        });
      });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  const sendMessage = async (
    isi: string,
    idPengirim: string,
    tipePengirim: string,
    roomIdOverride?: string
  ) => {
    const targetRoomId = roomIdOverride || roomId;
    if (!targetRoomId) return;

    await db.collection('chatRooms').doc(targetRoomId).collection('pesan').add({
      isi,
      idPengirim,
      tipePengirim,
      waktu: serverTimestamp(),
      sudahDibaca: false,
      namaFile: null,
      urlFile: null,
    });

    await db.collection('chatRooms').doc(targetRoomId).update({
      pesanTerakhir: isi,
      terakhirDiperbarui: serverTimestamp(),
    });
  };

  return { messages, loading, sendMessage };
};
