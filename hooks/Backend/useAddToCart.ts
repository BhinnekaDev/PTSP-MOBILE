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

    // Pastikan cartCollectionRef dan userCartDocRef didefinisikan di sini
    const cartCollectionRef = db.collection('keranjang');
    const userCartDocRef = cartCollectionRef.doc(user.uid);

    try {
      const collectionName =
        lowercasedProductType === 'informasi' ? 'informasi' : 'jasa';

      // Gunakan product.id (ID yang diterima dari komponen) untuk mengambil data dari koleksi asli
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

      // *** PERBAIKAN KRUSIAL: Membangun kembali productData dengan ID dari productSnap.id ***
      const productData = {
        id: productSnap.id, // Ambil ID dari snapshot yang baru saja diambil
        ...(productSnap.data() as Omit<ProductData, 'id'>), // Ambil data lainnya
      };

      const idField =
        lowercasedProductType === 'informasi' ? 'ID_Informasi' : 'ID_Jasa';
      const typeField =
        lowercasedProductType.charAt(0).toUpperCase() +
        lowercasedProductType.slice(1);

      const newItemPayload = {
        Harga: productData.Harga,
        [idField]: productData.id, // Ini akan menggunakan ID yang sudah benar dari productData
        Kuantitas: 1,
        Nama: productData.Nama,
        Pemilik: productData.Pemilik,
        Total_Harga: productData.Harga,
        // Jika Nomor_Rekening bisa opsional atau undefined, pastikan ditangani.
        // Contoh: Nomor_Rekening: productData.Nomor_Rekening || null,
      };

      const userCartDoc = await userCartDocRef.get();

      if (userCartDoc.exists()) {
        const currentCartData = userCartDoc.data();
        const currentTypeArray = currentCartData?.[typeField] || [];

        const existingProductIndex = currentTypeArray.findIndex(
          (item: any) => item[idField] === productData.id // Gunakan productData.id untuk konsistensi
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
          ID_Pengguna: user.uid,
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
