// hooks/Backend/useAddToCart.ts

import { useState } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';
import { router } from 'expo-router';
import { ProductData, ProductType } from '@/interfaces/productDataProps';
import { showMessage } from 'react-native-flash-message';

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
      showMessage({
        message: 'Login Diperlukan',
        description: 'Anda harus login untuk menambahkan produk ke keranjang.',
        type: 'warning',
        position: 'top',
        icon: 'auto',
        autoHide: true,
        duration: 3000,
      });
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
        showMessage({
          message: 'Produk Tidak Ditemukan',
          description:
            'Maaf, produk ini tidak lagi tersedia di database atau ID-nya salah.',
          type: 'danger',
        });
        setLoadingAddToCart(false);
        return;
      }

      const productRawData = productSnap.data();

      if (!productRawData) {
        showMessage({
          message: 'Error',
          description: 'Data produk tidak ditemukan, meskipun produk ada.',
          type: 'danger',
        });
        setLoadingAddToCart(false);
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

          showMessage({
            message: 'Berhasil',
            description: 'Kuantitas produk di keranjang telah diperbarui!',
            type: 'success',
          });
        } else {
          await userCartDocRef.update({
            [typeField]: [...currentTypeArray, newItemPayload],
          });
          showMessage({
            message: 'Berhasil',
            description: 'Produk berhasil ditambahkan ke keranjang!',
            type: 'success',
          });
        }
      } else {
        await userCartDocRef.set({
          [typeField]: [newItemPayload],
        });
        showMessage({
          message: 'Berhasil',
          description: 'Produk berhasil ditambahkan ke keranjang baru!',
          type: 'success',
        });
      }
    } catch (error: any) {
      console.error('Gagal menambahkan ke keranjang:', error);
      showMessage({
        message: 'Error',
        description: `Gagal menambahkan produk ke keranjang. Silakan coba lagi. ${
          error.message || ''
        }`,
        type: 'danger',
      });
    } finally {
      setLoadingAddToCart(false);
    }
  };

  return { loadingAddToCart, addToCart };
};
