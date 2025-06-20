import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

type ProductData = {
  Deskripsi: string;
  Harga: number;
  Nama: string;
  Nomor_Rekening: number;
  Pemilik: string;
  Status: string;
};

// Hook ini sekarang menerima HANYA satu 'category' string
export const useGetProductsByCategory = (compositeCategory: string) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [ownerName, setOwnerName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!compositeCategory) {
        setLoading(false);
        setProducts([]);
        setOwnerName('');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Memecah compositeCategory menjadi productType dan actualCategory
        const parts = compositeCategory.split('_');
        if (parts.length < 2) {
          console.error(`❌ Format kategori tidak valid: ${compositeCategory}`);
          setError('Format kategori tidak valid.');
          setLoading(false);
          return;
        }

        const productType = parts[0].toLowerCase(); // 'informasi' atau 'jasa'
        const actualCategory = parts.slice(1).join('_'); // 'Meteorologi', 'Klimatologi', 'Geofisika'

        let collectionName;
        if (productType === 'informasi') {
          collectionName = 'informasi';
        } else if (productType === 'jasa') {
          collectionName = 'jasa';
        } else {
          console.error(`❌ Tipe produk tidak dikenal: ${productType}`);
          setError('Tipe produk tidak dikenal.');
          setLoading(false);
          return;
        }

        const collectionRef = db.collection(collectionName);
        const snapshot = await collectionRef
          .where('Pemilik', '==', actualCategory) // Gunakan actualCategory untuk filter Pemilik
          .get();

        const fetchedProducts: ProductData[] = [];
        snapshot.forEach((doc) => {
          fetchedProducts.push(doc.data() as ProductData);
        });

        setProducts(fetchedProducts);

        if (fetchedProducts.length > 0) {
          setOwnerName(fetchedProducts[0].Pemilik);
        } else {
          setOwnerName(actualCategory); // Fallback ke nama kategori jika tidak ada produk
        }
      } catch (err) {
        console.error(
          `❌ Gagal mengambil produk untuk ${compositeCategory}:`,
          err
        );
        setError(
          `Gagal memuat produk untuk ${compositeCategory}. Silakan coba lagi nanti.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [compositeCategory]);

  return { products, ownerName, loading, error };
};
