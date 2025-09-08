import { useEffect, useState } from 'react';
import {
  db,
  firebaseAuth,
  firebaseStorage,
  serverTimestamp,
} from '@/lib/firebase';

// OUR INTERFACES
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

        // Tandai pesan sebagai sudah dibaca
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

  // ✅ Kirim pesan teks biasa
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

  // ✅ Kirim pesan dengan file
  const sendMessageWithFile = async (
    file: { base64: string; name: string; mimeType: string },
    isi: string,
    idPengirim: string,
    tipePengirim: string,
    roomIdOverride?: string
  ) => {
    const targetRoomId = roomIdOverride || roomId;
    if (!targetRoomId) return;

    const folderPath = `Chat_Files/${idPengirim}`;
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = `${folderPath}/${uniqueFileName}`;
    const fileRef = firebaseStorage.ref(filePath);

    // Upload file ke Firebase Storage
    await fileRef.putString(file.base64, 'base64', {
      contentType: file.mimeType,
    });

    const downloadUrl = await fileRef.getDownloadURL();

    // Simpan pesan di Firestore
    await db.collection('chatRooms').doc(targetRoomId).collection('pesan').add({
      isi,
      idPengirim,
      tipePengirim,
      waktu: serverTimestamp(),
      sudahDibaca: false,
      namaFile: file.name,
      urlFile: downloadUrl,
    });

    await db
      .collection('chatRooms')
      .doc(targetRoomId)
      .update({
        pesanTerakhir: isi || file.name,
        terakhirDiperbarui: serverTimestamp(),
      });
  };

  return { messages, loading, sendMessage, sendMessageWithFile };
};
