import { showMessage } from 'react-native-flash-message';
import { Audio } from 'expo-av';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Fungsi untuk memutar satu file audio universal
const playNotificationSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audios/alert-audio.mp3')
    );
    await sound.playAsync();
  } catch (error) {
    console.warn('Gagal memutar audio:', error);
  }
};

// Fungsi utama untuk menampilkan pesan responsif
export const showAppMessage = async (
  message: string,
  description?: string,
  type: 'success' | 'error' | 'delete' | 'warning' = 'success'
) => {
  await playNotificationSound();

  // Warna background berdasarkan tipe
  const backgroundColors: Record<string, string> = {
    success: '#4BB543', // hijau
    error: '#D9534F', // merah
    delete: '#FFA500', // oranye
    warning: '#F0AD4E', // kuning
  };

  showMessage({
    message,
    description,
    type: type === 'error' ? 'danger' : 'success',
    backgroundColor: backgroundColors[type] || '#4BB543',
    color: 'white',
    style: {
      marginTop: hp(5),
      borderRadius: hp(1),
      marginHorizontal: wp(5),
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(3),
    },
    titleStyle: {
      fontSize: wp(4),
      fontFamily: 'LexBold',
    },
    textStyle: {
      fontSize: wp(3.4),
      fontFamily: 'LexRegular',
    },
  });
};
