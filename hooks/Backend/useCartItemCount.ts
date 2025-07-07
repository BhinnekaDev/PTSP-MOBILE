import { useEffect, useState } from 'react';
import { db, firebaseAuth } from '@/lib/firebase';

export const useCartItemCount = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (!user) return;

    const unsubscribe = db
      .collection('keranjang')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          setCartCount(0);
          return;
        }

        const data = doc.data();
        const informasi = data?.Informasi || [];
        const jasa = data?.Jasa || [];

        const totalItem = [...informasi, ...jasa].reduce(
          (sum, item) => sum + (item.Kuantitas || 0),
          0
        );

        setCartCount(totalItem);
      });

    return () => unsubscribe();
  }, []);

  return { cartCount };
};
