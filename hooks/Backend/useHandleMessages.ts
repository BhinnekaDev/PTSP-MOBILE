// hooks/useHandleMessages.ts
import { useEffect, useState } from 'react';
import { Alert, Platform, ToastAndroid } from 'react-native';
import {
  db,
  firebaseAuth,
  firebaseStorage,
  serverTimestamp,
} from '@/lib/firebase';

// OUR INTERFACES
import { FirestoreMessage } from '@/interfaces/messagesProps';
import { UploadFileProps } from '@/interfaces/uploadFileProps';

export const useHandleMessages = (roomId: string | undefined) => {
  const [messages, setMessages] = useState<FirestoreMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = firebaseAuth.currentUser?.uid;
  const [messageToDelete, setMessageToDelete] =
    useState<FirestoreMessage | null>(null);

  // 🔹 Listener pesan
  useEffect(() => {
    if (!roomId) return setLoading(false);

    const unsubscribe = db
      .collection('chatRooms')
      .doc(roomId)
      .collection('pesan')
      .orderBy('waktu', 'asc')
      .onSnapshot((snapshot) => {
        const msgs: FirestoreMessage[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as FirestoreMessage
        );
        setMessages(msgs);
        setLoading(false);

        // Tandai otomatis pesan sudah dibaca
        msgs.forEach((msg) => {
          if (msg.idPengirim !== currentUserId && !msg.sudahDibaca) {
            db.collection('chatRooms')
              .doc(roomId)
              .collection('pesan')
              .doc(msg.id)
              .update({ sudahDibaca: true });
          }
        });
      });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  // 🔹 Kirim pesan teks
  const sendMessage = async (isi: string, tipePengirim: string) => {
    if (!roomId || !currentUserId) return;
    await db.collection('chatRooms').doc(roomId).collection('pesan').add({
      isi,
      idPengirim: currentUserId,
      tipePengirim,
      waktu: serverTimestamp(),
      sudahDibaca: false,
      namaFile: null,
      urlFile: null,
      mimeType: null,
      base64: null,
    });

    await db.collection('chatRooms').doc(roomId).update({
      pesanTerakhir: isi,
      terakhirDiperbarui: serverTimestamp(),
    });
  };

  // 🔹 Kirim pesan dengan file
  const sendMessageWithFile = async (
    file: UploadFileProps,
    isi: string,
    tipePengirim: string
  ) => {
    if (!roomId || !currentUserId) return;

    const folderPath = `Chat_Files/${currentUserId}`;
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = `${folderPath}/${uniqueFileName}`;
    const fileRef = firebaseStorage.ref(filePath);

    // Upload file
    await fileRef.putString(file.base64, 'base64', {
      contentType: file.mimeType,
    });
    const downloadUrl = await fileRef.getDownloadURL();

    await db.collection('chatRooms').doc(roomId).collection('pesan').add({
      isi,
      idPengirim: currentUserId,
      tipePengirim,
      waktu: serverTimestamp(),
      sudahDibaca: false,
      namaFile: file.name,
      urlFile: downloadUrl,
      mimeType: file.mimeType,
      base64: file.base64,
    });

    // Tentukan preview
    let lastMessagePreview = '';
    if (file.mimeType.startsWith('image/')) lastMessagePreview = '🖼️ IMG';
    else if (file.mimeType.includes('pdf')) lastMessagePreview = '📄 PDF';
    else if (
      file.mimeType.includes('word') ||
      file.mimeType.includes('excel') ||
      file.mimeType.includes('powerpoint')
    )
      lastMessagePreview = '📎 Dokumen';
    else lastMessagePreview = '📎 File';

    if (isi) lastMessagePreview += ` ${isi}`;

    await db.collection('chatRooms').doc(roomId).update({
      pesanTerakhir: lastMessagePreview,
      terakhirDiperbarui: serverTimestamp(),
    });
  };

  // 🔹 Hapus pesan
  const confirmDeleteMessage = (msg: FirestoreMessage) =>
    setMessageToDelete(msg);

  const handleDeleteMessage = async () => {
    if (!messageToDelete || !roomId) return cleanup();

    try {
      const docRef = db
        .collection('chatRooms')
        .doc(roomId)
        .collection('pesan')
        .doc(messageToDelete.id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) return showToast('Pesan tidak ditemukan'), cleanup();

      const data = docSnap.data();
      if (data?.idPengirim !== currentUserId)
        return showToast('Anda tidak berwenang menghapus pesan ini'), cleanup();

      const pesanTime = data?.waktu?.toDate?.();
      if (
        pesanTime &&
        (new Date().getTime() - pesanTime.getTime()) / 60000 > 5
      ) {
        return showToast('Pesan hanya bisa dihapus dalam 5 menit'), cleanup();
      }

      await docRef.delete();
      showToast('Pesan berhasil dihapus');
    } catch {
      showToast('Gagal menghapus pesan');
    } finally {
      cleanup();
    }
  };

  const cleanup = () => setMessageToDelete(null);

  const showToast = (msg: string) => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert(msg);
  };

  return {
    messages,
    loading,
    sendMessage,
    sendMessageWithFile,
    messageToDelete,
    confirmDeleteMessage,
    handleDeleteMessage,
    setMessageToDelete,
  };
};
