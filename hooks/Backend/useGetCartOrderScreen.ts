import { useEffect, useState } from 'react';
import { firebaseAuth, db } from '@/lib/firebase';

export type CartItem = {
  Nama: string;
  Harga: number;
  Kuantitas: number;
  Total_Harga: number;
  Pemilik: string;
  ID_Informasi?: string;
  ID_Jasa?: string;
};

export const useGetCartOrderScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (!user) {
      setCartItems([]);
      setTotalHarga(0);
      setLoading(false);
      return;
    }

    const unsubscribe = db
      .collection('keranjang')
      .doc(user.uid)
      .onSnapshot((docSnap) => {
        const data = docSnap.data();
        if (!data) {
          setCartItems([]);
          setTotalHarga(0);
          setLoading(false);
          return;
        }

        const informasi = data.Informasi || [];
        const jasa = data.Jasa || [];
        const allItems = [...informasi, ...jasa];

        setCartItems(allItems);

        const total = allItems.reduce(
          (sum: number, item: CartItem) => sum + (item.Total_Harga || 0),
          0
        );

        setTotalHarga(total);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return { cartItems, totalHarga, loading };
};
