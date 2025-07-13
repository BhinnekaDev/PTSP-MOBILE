import { db, firebaseAuth } from '@/lib/firebase';
import { showMessage } from 'react-native-flash-message';

export const useUpdateCartQuantityScreen = () => {
  const updateQuantity = async (
    productId: string,
    type: 'Informasi' | 'Jasa',
    operation: 'increment' | 'decrement'
  ) => {
    const user = firebaseAuth.currentUser;
    if (!user) return;

    const userCartRef = db.collection('keranjang').doc(user.uid);
    const idField = type === 'Informasi' ? 'ID_Informasi' : 'ID_Jasa';

    try {
      const docSnap = await userCartRef.get();
      if (!docSnap.exists) return;

      const data = docSnap.data();
      const currentArray = data?.[type] || [];

      const index = currentArray.findIndex(
        (item: any) => item[idField] === productId
      );
      if (index === -1) return;

      let item = currentArray[index];

      if (operation === 'decrement') {
        if (item.Kuantitas === 1) {
          // Hapus produk dari array
          const updatedArray = currentArray.filter(
            (item: any) => item[idField] !== productId
          );
          await userCartRef.update({ [type]: updatedArray });

          showMessage({
            message: 'Produk dihapus dari keranjang',
            type: 'success',
          });
          return;
        }

        item.Kuantitas -= 1;
      } else {
        item.Kuantitas += 1;
      }

      item.Total_Harga = item.Kuantitas * item.Harga;
      currentArray[index] = item;

      await userCartRef.update({ [type]: currentArray });

      showMessage({
        message: 'Kuantitas diperbarui',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Update kuantitas gagal:', error);
      showMessage({
        message: 'Error',
        description: 'Tidak bisa update kuantitas.',
        type: 'danger',
      });
    }
  };

  return { updateQuantity };
};
