import { useState } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';
import { router } from 'expo-router';

// OUR INTERFACES
import { ProductData, ProductType } from '@/interfaces/productDataProps';

// OUR UTILS
import { showAppMessage } from '@/utils/showAlertMessage';

type ProductDataForCart = ProductData;

export const useAddToCart = () => {
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const addToCart = async (
    product: ProductDataForCart,
    receivedProductType: ProductType
  ) => {
    setLoadingAddToCart(true);
    const user = firebaseAuth.currentUser;

    if (!user) {
      showAppMessage(
        'Login Diperlukan',
        'Anda harus login untuk menambahkan produk ke keranjang.',
        'warning'
      );
      router.push('/screens/loginScreen');
      setLoadingAddToCart(false);
      return;
    }

    const lowercasedProductType = receivedProductType.toLowerCase();
    const cartCollectionRef = db.collection('keranjang');
    const userCartDocRef = cartCollectionRef.doc(user.uid);

    try {
      const collectionName =
        lowercasedProductType === 'informasi' ? 'informasi' : 'jasa';
      const productRef = db.collection(collectionName).doc(product.id);
      const productSnap = await productRef.get();

      if (!productSnap.exists()) {
        showAppMessage(
          'Produk Tidak Ditemukan',
          'Maaf, produk ini tidak lagi tersedia di database atau ID-nya salah.'
        );
        return;
      }

      const productRawData = productSnap.data();
      if (!productRawData) {
        showAppMessage(
          'Error',
          'Data produk tidak ditemukan, meskipun produk ada.'
        );
        return;
      }

      const productData: ProductData = {
        id: productSnap.id,
        ...productRawData,
      } as ProductData;

      const idField =
        lowercasedProductType === 'informasi' ? 'ID_Informasi' : 'ID_Jasa';
      const typeField =
        lowercasedProductType.charAt(0).toUpperCase() +
        lowercasedProductType.slice(1);

      const newItemPayload = {
        Harga: productData.Harga,
        [idField]: productData.id,
        Kuantitas: 1,
        Nama: productData.Nama,
        Pemilik: productData.Pemilik,
        Total_Harga: productData.Harga,
      };

      const userCartDoc = await userCartDocRef.get();

      if (userCartDoc.exists()) {
        const currentCartData = userCartDoc.data();
        const currentTypeArray = currentCartData?.[typeField] || [];

        const existingProductIndex = currentTypeArray.findIndex(
          (item: any) => item[idField] === productData.id
        );

        if (existingProductIndex !== -1) {
          const updatedKuantitas =
            currentTypeArray[existingProductIndex].Kuantitas + 1;
          const updatedTotalHarga = updatedKuantitas * productData.Harga;

          const updatedTypeArray = currentTypeArray.map(
            (item: any, index: number) =>
              index === existingProductIndex
                ? {
                    ...item,
                    Kuantitas: updatedKuantitas,
                    Total_Harga: updatedTotalHarga,
                  }
                : item
          );
          await userCartDocRef.update({
            [typeField]: updatedTypeArray,
          });

          showAppMessage(
            'Berhasil',
            'Kuantitas produk di keranjang telah diperbarui!',
            'success'
          );
        } else {
          await userCartDocRef.update({
            [typeField]: [...currentTypeArray, newItemPayload],
          });
          showAppMessage(
            'Berhasil',
            'Produk berhasil ditambahkan ke keranjang!',
            'success'
          );
        }
      } else {
        await userCartDocRef.set({
          [typeField]: [newItemPayload],
        });
        showAppMessage(
          'Berhasil',
          'Produk berhasil ditambahkan ke keranjang baru!',
          'success'
        );
      }
    } catch (error: any) {
      console.error('Gagal menambahkan ke keranjang:', error);
      showAppMessage(
        'Error',
        `Gagal menambahkan produk ke keranjang. Silakan coba lagi. ${
          error.message || ''
        }`
      );
    } finally {
      setLoadingAddToCart(false);
    }
  };

  return { loadingAddToCart, addToCart };
};
