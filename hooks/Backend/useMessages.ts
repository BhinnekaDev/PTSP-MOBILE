import { useEffect, useState } from 'react';
import { db, serverTimestamp } from '@/lib/firebase'; // serverTimestamp dari config

interface Message {
  id: string;
  isi: string;
  idPengirim: string;
  waktu: any;
  sudahDibaca: boolean;
  namaFile?: string | null;
  urlFile?: string | null;
  tipePengirim: string;
}

export const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = db
      .collection('chatRooms')
      .doc(roomId)
      .collection('pesan')
      .orderBy('waktu', 'asc')
      .onSnapshot((snapshot) => {
        const msgs: Message[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, 'id'>),
        }));
        setMessages(msgs);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (
    isi: string,
    idPengirim: string,
    tipePengirim: string
  ) => {
    if (!roomId) return;

    await db.collection('chatRooms').doc(roomId).collection('pesan').add({
      id: roomId,
      isi,
      idPengirim,
      tipePengirim,
      waktu: serverTimestamp(), // 🔥 harus dipanggil
      sudahDibaca: false,
      namaFile: null,
      urlFile: null,
    });

    // update pesan terakhir & timestamp di chatRooms
    await db.collection('chatRooms').doc(roomId).update({
      pesanTerakhir: isi,
      terakhirDiperbarui: serverTimestamp(),
    });
  };

  return { messages, loading, sendMessage };
};
