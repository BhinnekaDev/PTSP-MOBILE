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

import { dataStations } from '@/constants/dataStations';


export default function Chat() {
  const router = useRouter();
  const [showMessages, setShowMessages] = useState(true);
  const rotateChevron = useSharedValue(0);

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
            ({dataStations.length})
          </Text>
        </TouchableOpacity>

        {showMessages && (
          <Animated.View entering={FadeInUp.duration(400)}>
            {dataStations.map((station, idx) => (
              <TouchableOpacity
                key={idx}
                className="mt-2 flex-row items-center gap-4 rounded-xl bg-white p-2 shadow"
                activeOpacity={0.5}
                onPress={() => router.push('/screens/roomChatScreen')}
              >
                <View className="rounded-full bg-gray-300 p-4">
                  {station.icon}
                </View>
                <View className="flex-1">
                  <Text style={{ fontFamily: 'LexBold' }} className="text-lg">
                    {station.name}
                  </Text>
                  <Text style={{ fontFamily: 'LexRegular' }}>
                    {'Lorem ipsum dolor sit amet consectetur...'.slice(0, 30) +
                      '...'}
                  </Text>
                </View>
                <View className="flex-col items-center justify-center">
                  <Text
                    style={{ fontFamily: 'LexRegular' }}
                    className="text-sm"
                  >
                    {station.date}
                  </Text>
                  <Text
                    className="rounded-full bg-red-500 px-2 py-px text-sm text-white"
                    style={{ fontFamily: 'LexRegular' }}
                  >
                    {station.unread}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
