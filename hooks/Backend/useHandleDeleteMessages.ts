import { useState } from 'react';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { db, firebaseAuth } from '@/lib/firebase';

// OUR INTERFACES
import { UIMessage } from '@/interfaces/uiMessagesProps';

export function useHandleDeleteMessages(roomId: string | undefined) {
  const [messageToDelete, setMessageToDelete] = useState<UIMessage | null>(
    null
  );
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const confirmDeleteMessage = (message: UIMessage) => {
    setMessageToDelete(message);
    setCustomAlertVisible(true);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete || !roomId) {
      setCustomAlertVisible(false);
      setMessageToDelete(null);
      return;
    }

    try {
      const msgDocRef = db
        .collection('chatRooms')
        .doc(roomId)
        .collection('pesan')
        .doc(messageToDelete.id);

      const docSnap = await msgDocRef.get();
      if (!docSnap.exists) {
        showToast('Pesan tidak ditemukan');
        cleanup();
        return;
      }

      const currentUserId = firebaseAuth.currentUser?.uid;
      const data = docSnap.data();

      if (
        data &&
        data.idPengirim &&
        currentUserId &&
        data.idPengirim !== currentUserId
      ) {
        showToast('Anda tidak berwenang menghapus pesan ini');
        cleanup();
        return;
      }

      // ✅ Cek apakah pesan sudah lebih dari 5 menit
      const pesanTime = data?.waktu?.toDate?.() || null;
      if (pesanTime) {
        const now = new Date();
        const diffInMs = now.getTime() - pesanTime.getTime();
        const diffInMinutes = diffInMs / (1000 * 60);

        if (diffInMinutes > 5) {
          showToast('Pesan hanya bisa dihapus dalam 5 menit setelah dikirim');
          cleanup();
          return;
        }
      }

      // ✅ Hapus pesan jika masih dalam 5 menit
      await msgDocRef.delete();
      showToast('Pesan berhasil dihapus');
    } catch {
      showToast('Gagal menghapus pesan');
    } finally {
      cleanup();
    }
  };

  const cleanup = () => {
    setCustomAlertVisible(false);
    setMessageToDelete(null);
  };

  const showToast = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  return {
    customAlertVisible,
    confirmDeleteMessage,
    handleDeleteMessage,
    setCustomAlertVisible,
    setMessageToDelete,
  };
}
