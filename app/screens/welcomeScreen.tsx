import { Image, Animated, View, Easing, Text } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/button";

export default function Index() {
  const translateY = useRef(new Animated.Value(0)).current;
  const fadeGradient = useRef(new Animated.Value(0)).current;
  const fadeBg = useRef(new Animated.Value(1)).current;
  const fadeText = useRef(new Animated.Value(0)).current;
  const slideButtonY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeBg, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeGradient, {
        toValue: 1,
        duration: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeText, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(slideButtonY, {
          toValue: 0,
          duration: 600,
          delay: 100,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center overflow-hidden">
      {/* Gradient Background Layer */}
      <Animated.View
        style={{ opacity: fadeGradient }}
        className="absolute inset-0"
      >
        <View className="flex-1">
          <LinearGradient
            colors={["#1475BA", "#36918A", "#6BBC3F"]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </View>
      </Animated.View>

      {/* Solid Color Background - fade out */}
      <Animated.View
        style={{ opacity: fadeBg }}
        className="absolute inset-0 bg-[#1475BA]"
      />

      {/* Animated Logo */}
      <Animated.View
        className="flex-row items-center justify-center pl-1 gap-3"
        style={{ transform: [{ translateY }] }}
      >
        <Image
          source={require("@/assets/images/logo-bmkg.png")}
          className="w-[76px] h-[95px]"
        />
        <Image
          source={require("@/assets/images/logo-ptsp.png")}
          className="w-72 h-20"
        />
      </Animated.View>

      {/* Animated Text & Button */}
      <View className="justify-center items-center absolute bottom-64">
        {/* Fade in Text */}
        <Animated.View style={{ opacity: fadeText }}>
          <Text className="text-4xl font-bold text-white">
            Halo, Selamat Datang!
          </Text>
          <Text className="text-xl text-white text-center py-12">
            Kami hadir dengan tampilan baru dan {"\n"} pengalaman yang lebih
            baik. {"\n"}
            Ayo mulai sekarang!
          </Text>
        </Animated.View>

        {/* Slide In Button */}
        <Animated.View
          style={{
            transform: [{ translateY: slideButtonY }],
          }}
        >
          <Button style="bg-[#73BF40] px-20 py-3 mt-9">Mulai</Button>
        </Animated.View>
      </View>
    </View>
  );
}
