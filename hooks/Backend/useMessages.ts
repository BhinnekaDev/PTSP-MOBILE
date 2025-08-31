import { useEffect, useState } from 'react';
import { db, serverTimestamp } from '@/lib/firebase'; // tambahin firebaseAuth biar tau UID

interface Message {
  id: string; // id dokumen pesan
  roomId: string; // 🔥 id room tempat pesan disimpan
  isi: string;
  idPengirim: string;
  waktu: any;
  sudahDibaca: boolean;
  namaFile?: string | null;
  urlFile?: string | null;
  tipePengirim: string; // admin | perusahaan | perorangan
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

  /**
   * Kirim pesan ke subcollection `pesan`
   */
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
      id: targetRoomId, // tambahan: simpan id room ke pesan
    });

    await db.collection('chatRooms').doc(targetRoomId).update({
      pesanTerakhir: isi,
      terakhirDiperbarui: serverTimestamp(),
    });
  };

  return { messages, loading, sendMessage };
};
