// hooks/Backend/useAddToCart.ts

import { useState } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { ProductData, ProductType } from '@/interfaces/productDataProps';

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
      Alert.alert(
        'Login Diperlukan',
        'Anda harus login untuk menambahkan produk ke keranjang.'
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
        Alert.alert(
          'Produk Tidak Ditemukan',
          'Maaf, produk ini tidak lagi tersedia di database atau ID-nya salah.'
        );
        setLoadingAddToCart(false);
        return;
      }

      // --- PERBAIKAN: Membangun kembali productData tanpa menggunakan Omit ---
      // --- PERBAIKAN AKHIR: Memastikan 'id' selalu dari snapshot dan menghindari duplikasi ---
      const productRawData = productSnap.data();

      if (!productRawData) {
        Alert.alert(
          'Error',
          'Data produk tidak ditemukan, meskipun produk ada.'
        );
        setLoadingAddToCart(false);
        return;
      }

      // Explicitly define productData with the correct ID and spread the rest of the data.
      // If productRawData *also* contains an 'id' field within its document,
      // the 'id: productSnap.id' will correctly override it due to order.
      const productData: ProductData = {
        id: productSnap.id,
        ...productRawData, // Spread the raw data from the document
      } as ProductData; // Assert the final shape to ProductData

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
        // Pastikan untuk menyertakan Nomor_Rekening jika itu bagian dari ProductData dan relevan untuk keranjang
        // Nomor_Rekening: productData.Nomor_Rekening || null, // Example if it can be optional
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
          Alert.alert(
            'Berhasil',
            'Kuantitas produk di keranjang telah diperbarui!'
          );
        } else {
          await userCartDocRef.update({
            [typeField]: [...currentTypeArray, newItemPayload],
          });
          Alert.alert('Berhasil', 'Produk berhasil ditambahkan ke keranjang!');
        }
      } else {
        await userCartDocRef.set({
          [typeField]: [newItemPayload],
        });
        Alert.alert(
          'Berhasil',
          'Produk berhasil ditambahkan ke keranjang baru!'
        );
      }
    } catch (error: any) {
      console.error('Gagal menambahkan ke keranjang:', error);
      Alert.alert(
        'Error',
        `Gagal menambahkan produk ke keranjang. Silakan coba lagi. ${error.message || ''}`
      );
    } finally {
      setLoadingAddToCart(false);
    }
  };

  return { loadingAddToCart, addToCart };
};
