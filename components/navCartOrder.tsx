import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

// OUR ICONS
import { AntDesign, Ionicons } from '@expo/vector-icons';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';

// OUR INTERFACES
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

export default function NavCartOrder({
  count = 1,
  text,
  textClassName,
  onPressLeftIcon,
  onPressRightIcon,
  isTouchable = true,
}: ButtonCustomProps) {
  return (
    <View className="relative flex-row items-center rounded-b-[10px] bg-[#1475BA] py-10 pb-4 pr-4">
      {/* TOMBOL UTAMA*/}
      <ButtonCustom
        classNameContainer="py-0 w-[90%]"
        isTouchable={isTouchable}
        text={text}
        iconLeft={<AntDesign name="arrowleft" size={24} color="white" />}
        onPressLeftIcon={onPressLeftIcon}
        textClassName={`text-[20px] text-white ${textClassName}`}
      />
      {/* ICON KANAN - Dibuat sejajar secara vertikal dengan parent flex-row */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressRightIcon ?? (() => router.push('/screens/chatScreen'))}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="white" />
        {/* NOTIFIKASI PESAN */}
        {count > 0 && (
          <View className="absolute -right-2 -top-1 z-10 h-5 w-5 items-center justify-center rounded-full bg-red-600">
            <Text
              className="text-[10px] text-white"
              style={{ fontFamily: 'LexBold' }}
            >
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
