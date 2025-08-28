import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// OUR ICONS
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// OUR CONSTANT
import { dataStations } from '@/constants/dataStations';

// OUR HOOKS
import { useChatRooms } from '@/hooks/Backend/useChatRooms';

export default function Chat() {
  const router = useRouter();
  const [showMessages, setShowMessages] = useState(true);
  const rotateChevron = useSharedValue(0);

  // 🔥 Ambil UID user yang login
  const { chatRooms, markAsRead, loading } = useChatRooms();

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${rotateChevron.value}deg`, { duration: 300 }),
        },
      ],
    };
  });

  const toggleMessages = () => {
    setShowMessages((prev) => {
      rotateChevron.value = prev ? 0 : 180;
      return !prev;
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading chat...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <View className="w-full flex-row items-center rounded-b-[10px] bg-[#1475BA] px-4 py-4 shadow-md">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 rounded-full p-1"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'LexBold' }} className="text-2xl text-white">
          Pesan
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={toggleMessages}
          activeOpacity={0.6}
          className="flex-row items-center gap-2 px-4 pb-2 pt-6"
        >
          <Animated.View style={chevronStyle}>
            <Entypo name="chevron-up" size={24} color="black" />
          </Animated.View>
          <Text style={{ fontFamily: 'LexBold' }} className="text-xl">
            Pesan Saya
          </Text>
          <Text style={{ fontFamily: 'LexBold' }} className="text-xl">
            ({chatRooms.length})
          </Text>
        </TouchableOpacity>

        {showMessages && (
          <Animated.View entering={FadeInUp.duration(400)}>
            {dataStations.map((station) => {
              // cari apakah station ini sudah ada di chatRooms
              const room = chatRooms.find(
                (r) => r.roomChat.toLowerCase() === station.name.toLowerCase()
              );

              return (
                <TouchableOpacity
                  key={station.name}
                  className="mt-2 flex-row items-center gap-4 rounded-xl bg-white p-2 shadow"
                  activeOpacity={0.5}
                  onPress={() => {
                    if (room?.id) markAsRead(room.id);
                    router.push({
                      pathname: '/screens/roomChatScreen',
                      params: { roomId: room?.id || station.name },
                    });
                  }}
                >
                  {/* ICON */}
                  <View className="rounded-full bg-gray-300 p-4">
                    {station.icon}
                  </View>

                  {/* NAMA + PESAN */}
                  <View className="flex-1">
                    <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                      {station.name}
                    </Text>
                    <Text style={{ fontFamily: 'LexRegular' }}>
                      {room?.pesanTerakhir || 'Belum ada chat di stasiun ini.'}
                    </Text>
                  </View>

                  {/* DATE + UNREAD */}
                  <View className="flex-col items-center justify-center">
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-sm"
                    >
                      {room?.terakhirDiperbarui
                        ? room.terakhirDiperbarui.toDate().toLocaleDateString()
                        : '-'}
                    </Text>
                    {room?.unreadCount && room.unreadCount > 0 ? (
                      <Text className="rounded-full bg-red-500 px-2 py-px text-sm text-white">
                        {room.unreadCount}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        )}
      </ScrollView>
      <View className="h-7 w-full items-center justify-center bg-[#1475BA]">
        <Animated.View entering={FadeInDown.duration(400)}>
          <View className="h-1.5 w-32 rounded-full bg-white" />
        </Animated.View>
      </View>
    </View>
  );
}
