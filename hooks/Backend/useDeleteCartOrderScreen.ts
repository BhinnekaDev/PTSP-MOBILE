import { db, firebaseAuth } from '@/lib/firebase';
import { showMessage } from 'react-native-flash-message';

export const useDeleteCartOrderScreen = () => {
  const removeFromCart = async (
    productId: string,
    type: 'Informasi' | 'Jasa'
  ) => {
    const user = firebaseAuth.currentUser;
    if (!user) return;

    const userCartRef = db.collection('keranjang').doc(user.uid);
    const cartSnap = await userCartRef.get();

    if (!cartSnap.exists) return;

    const data = cartSnap.data();
    const itemArray = data?.[type] || [];
    const idField = type === 'Informasi' ? 'ID_Informasi' : 'ID_Jasa';

    const updatedArray = itemArray.filter(
      (item: any) => item[idField] !== productId
    );

    try {
      await userCartRef.update({
        [type]: updatedArray,
      });

      showMessage({
        message: 'Produk dihapus',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Gagal hapus item:', error);
      showMessage({
        message: 'Error',
        description: 'Tidak dapat menghapus produk. Silakan coba lagi.',
        type: 'danger',
      });
    }
  };

  return { removeFromCart };
};
