// components/ProductCardInfoButton.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ProductCardInfoButtonProps {
  productIndex: number; // Ubah nama prop dari 'index' menjadi 'productIndex' agar lebih jelas
  activePopupIndex: number | null; // Dari usePopupAnimation hook
  togglePopup: (index: number) => void; // Dari usePopupAnimation hook
  fadeAnim: Animated.Value; // Dari usePopupAnimation hook
  closePopup: () => void; // Dari usePopupAnimation hook, untuk overlay
}

export const ProductCardInfoButton: React.FC<ProductCardInfoButtonProps> = ({
  productIndex,
  activePopupIndex,
  togglePopup,
  fadeAnim,
  closePopup,
}) => {
  const isPopupActive = activePopupIndex === productIndex;

  return (
    <>
      {/* Info Icon with Pop-up functionality */}
      <TouchableOpacity
        onPress={() => togglePopup(productIndex)}
        className="absolute right-4 top-4 z-10 p-1"
      >
        <Ionicons name="information-circle" size={28} color="white" />
      </TouchableOpacity>

      {/* Pop-up message with animation and tail */}
      {isPopupActive && (
        // Overlay untuk menutup pop-up saat disentuh di luar pop-up itu sendiri
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFillObject}
          className="z-10" // Harus di bawah pop-up utama
          onPress={closePopup}
        >
          <Animated.View
            className="absolute -top-8 left-4 right-0 z-20 mx-auto w-11/12" // z-index pop-up harus lebih tinggi dari overlay
            style={{ opacity: fadeAnim }}
          >
            {/* Pop-up message box */}
            <View className="rounded-md bg-gray-800 p-2">
              <Text
                style={{ fontFamily: 'LexRegular' }}
                className="text-center text-xs text-white"
              >
                Produk akan menjadi Rp 0 jika mengambil ajukan gratis.
              </Text>
            </View>
            {/* The "tail" or "notch" */}
            <View
              className="absolute bg-gray-800"
              style={{
                width: 15,
                height: 15,
                right: 15, // Sesuaikan untuk menyelaraskan dengan ikon info
                bottom: -7,
                transform: [{ rotate: '45deg' }],
                borderRadius: 2,
                zIndex: 21,
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    </>
  );
};
