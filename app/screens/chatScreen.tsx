import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

export default function Chat() {
  const router = useRouter();
  const [showMessages, setShowMessages] = useState(true);
  const rotateChevron = useSharedValue(0);

  const stations = [
    {
      name: "Stasiun Meteorologi",
      icon: <FontAwesome6 name="mountain" size={40} color="#3498DB" />,
      date: "Jan 23",
      unread: 1,
    },
    {
      name: "Stasiun Klimatologi",
      icon: <FontAwesome6 name="cloud-bolt" size={40} color="#3498DB" />,
      date: "Jan 23",
      unread: 1,
    },
    {
      name: "Stasiun Geofisika",
      icon: <Feather name="wind" size={40} color="#3498DB" />,
      date: "Jan 23",
      unread: 1,
    },
  ];

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
      <View className="bg-[#1475BA] flex-row w-full items-center px-4 py-4 rounded-b-[10px] shadow-md">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-1 mr-3"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "LexBold" }} className="text-white text-2xl">
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
          className="flex-row gap-2 items-center pt-6 pb-2 px-4"
        >
          <Animated.View style={chevronStyle}>
            <Entypo name="chevron-up" size={24} color="black" />
          </Animated.View>
          <Text style={{ fontFamily: "LexBold" }} className="text-xl">
            Pesan Saya
          </Text>
          <Text style={{ fontFamily: "LexBold" }} className="text-xl">
            ({stations.length})
          </Text>
        </TouchableOpacity>

        {showMessages && (
          <Animated.View entering={FadeInUp.duration(400)}>
            {stations.map((station, idx) => (
              <TouchableOpacity
                key={idx}
                className="flex-row gap-4 items-center p-2 mt-2 bg-white rounded-xl shadow"
                activeOpacity={0.5}
                onPress={() => router.push("/screens/roomChatScreen")}
              >
                <View className="bg-gray-300 rounded-full p-4">
                  {station.icon}
                </View>
                <View className="flex-1">
                  <Text style={{ fontFamily: "LexBold" }} className="text-lg">
                    {station.name}
                  </Text>
                  <Text style={{ fontFamily: "LexRegular" }}>
                    {"Lorem ipsum dolor sit amet consectetur...".slice(0, 30) +
                      "..."}
                  </Text>
                </View>
                <View className="flex-col justify-center items-center">
                  <Text
                    style={{ fontFamily: "LexRegular" }}
                    className="text-sm"
                  >
                    {station.date}
                  </Text>
                  <Text
                    className="bg-red-500 rounded-full py-px px-2 text-sm text-white"
                    style={{ fontFamily: "LexRegular" }}
                  >
                    {station.unread}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
      <View className="bg-[#1475BA] w-full h-7 items-center justify-center">
        <Animated.View entering={FadeInDown.duration(400)}>
          <View className="bg-white w-32 h-1.5 rounded-full" />
        </Animated.View>
      </View>
    </View>
  );
}
