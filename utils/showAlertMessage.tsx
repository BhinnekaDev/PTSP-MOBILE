import { showMessage, hideMessage } from 'react-native-flash-message';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

export const showAlertMessage = async (
  message: string,
  description?: string,
  type: 'success' | 'error' | 'warning' | 'delete' = 'success',
  options?: {
    duration?: number;
    actionText?: string;
    onActionPress?: () => void;
  }
) => {
  await playNotificationSound();

  const backgroundColors: Record<string, string> = {
    success: 'rgba(75, 181, 67, 0.9)',
    error: 'rgba(217, 83, 79, 0.9)',
    warning: 'rgba(240, 173, 78, 0.9)',
    delete: 'rgba(255, 165, 0, 0.9)',
  };

  showMessage({
    message: '',
    description: '',
    type: 'info',
    backgroundColor: backgroundColors[type],
    color: 'white',
    duration: options?.duration ?? 4000,
    hideOnPress: false,
    autoHide: false,
    style: {
      marginTop: hp(5),
      borderRadius: hp(1),
      marginHorizontal: wp(5),
      paddingHorizontal: wp(3),
      paddingVertical: hp(2), // ✅ GUNAKAN POSITIVE VALUE
      flexDirection: 'column',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    titleStyle: {
      fontSize: wp(4),
      fontFamily: 'LexBold',
    },
    textStyle: {
      fontSize: wp(3.4),
      fontFamily: 'LexRegular',
    },
    renderCustomContent: () => (
      <View style={{ gap: 10 }}>
        <View>
          <Text
            style={{
              fontSize: wp(4),
              fontFamily: 'LexBold',
              color: 'white',
              marginBottom: description ? hp(0.5) : 0,
            }}
          >
            {message}
          </Text>

          {description && (
            <Text
              style={{
                fontSize: wp(3.4),
                fontFamily: 'LexRegular',
                color: 'white',
                opacity: 0.9,
              }}
            >
              {description}
            </Text>
          )}
        </View>
        {/* TOMBOL OPSIONAL */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: wp(2),
            marginTop: hp(0.5),
          }}
        >
          {options?.actionText && (
            <TouchableOpacity
              onPress={options.onActionPress}
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderRadius: hp(1),
                paddingVertical: hp(0.6),
                paddingHorizontal: wp(3),
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'LexBold',
                }}
              >
                {options.actionText}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={hideMessage}
            style={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              borderRadius: hp(1),
              paddingVertical: hp(0.6),
              paddingHorizontal: wp(3),
            }}
          >
            <Text
              style={{
                color: '#ddd',
                fontFamily: 'LexRegular',
              }}
            >
              Dismiss
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
  });
};
