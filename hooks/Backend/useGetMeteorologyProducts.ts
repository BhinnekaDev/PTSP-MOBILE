import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Adjust this path if your firebase.ts is elsewhere

type ProductData = {
  Deskripsi: string;
  Harga: number;
  Nama: string;
  Nomor_Rekening: number;
  Pemilik: string;
  Status: string;
};

export const useGetMeteorologyProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsRef = db.collection('informasi');
        const snapshot = await productsRef
          .where('Pemilik', '==', 'Meteorologi')
          .get();

        const fetchedProducts: ProductData[] = [];
        snapshot.forEach((doc) => {
          fetchedProducts.push(doc.data() as ProductData);
        });
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('❌ Gagal mengambil produk meteorologi:', err);
        setError('Gagal memuat produk. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
