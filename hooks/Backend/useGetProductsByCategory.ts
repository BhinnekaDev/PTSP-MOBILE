// hooks/Backend/useGetProductsByCategory.ts

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { ProductData } from '@/interfaces/productDataProps';

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

        const parts = compositeCategory.split('_');
        if (parts.length < 2) {
          console.error(`❌ Format kategori tidak valid: ${compositeCategory}`);
          setError('Format kategori tidak valid.');
          setLoading(false);
          return;
        }

        const productType = parts[0].toLowerCase();
        const actualCategory = parts.slice(1).join('_');

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
          .where('Pemilik', '==', actualCategory)
          .get();

        const fetchedProducts: ProductData[] = [];
        snapshot.forEach((doc) => {
          // *** PERBAIKAN KRUSIAL: Memastikan ID dokumen disertakan ***
          fetchedProducts.push({
            id: doc.id, // Ambil ID dokumen dari Firebase
            ...(doc.data() as Omit<ProductData, 'id'>), // Ambil data lainnya, kecuali 'id'
          });
        });

        setProducts(fetchedProducts);

        if (fetchedProducts.length > 0) {
          setOwnerName(fetchedProducts[0].Pemilik);
        } else {
          setOwnerName(actualCategory);
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
