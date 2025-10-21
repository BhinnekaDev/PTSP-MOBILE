// hooks/useInternetStatus.ts
import { useEffect, useState, useRef } from 'react';
import * as Network from 'expo-network';

// OUR UTILS
import { showAlertMessage } from '@/utils/showAlertMessage';

interface InternetStatus {
  isConnected: boolean;
  networkType: string | null;
}

export function useInternetStatus(checkInterval = 5000) {
  const [status, setStatus] = useState<InternetStatus>({
    isConnected: true,
    networkType: null,
  });

  const prevStatus = useRef<boolean | null>(null);

  const checkInternet = async () => {
    try {
      const type = await Network.getNetworkStateAsync();
      const connected = !!(type.isConnected && type.isInternetReachable);

      setStatus({
        isConnected: connected,
        networkType: type.type ? type.type.toString() : null,
      });

      // tampilkan alert hanya saat status berubah
      if (prevStatus.current !== null && prevStatus.current !== connected) {
        if (!connected) {
          showAlertMessage(
            'Tidak ada koneksi internet',
            'Periksa Wi-Fi atau Data seluler',
            'error'
          );
        } else {
          showAlertMessage('Koneksi internet kembali', undefined, 'success');
        }
      }

      prevStatus.current = connected;
    } catch (error) {
      console.warn('Gagal mengecek koneksi:', error);
      setStatus({ isConnected: false, networkType: null });
    }
  };

  useEffect(() => {
    // cek pertama kali saat mount
    checkInternet();

    // cek secara periodik setiap checkInterval ms
    const interval = setInterval(checkInternet, checkInterval);

    return () => clearInterval(interval);
  }, [checkInterval]);

  return status;
}
