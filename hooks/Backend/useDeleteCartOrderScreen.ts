import { db, firebaseAuth } from '@/lib/firebase';
import { showAlertMessage } from '@/utils/showAlertMessage';

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

      // ✅ Reusable & Responsive Success Message
      showAlertMessage(
        'Produk dihapus',
        'Produk berhasil dihapus dari keranjang.',
        'success'
      );
    } catch (error: any) {
      console.error('Gagal hapus item:', error);

      // ✅ Reusable & Responsive Error Message
      showAlertMessage(
        'Error',
        'Tidak dapat menghapus produk. Silakan coba lagi.'
      );
    }
  };

  return { removeFromCart };
};
