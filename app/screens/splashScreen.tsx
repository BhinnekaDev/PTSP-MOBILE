import { Image, View, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function SplashScreen({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  const [showMask, setShowMask] = useState(false);
  const [showLogoPTSP, setShowLogoPTSP] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const logoTranslateY = useRef(new Animated.Value(50)).current;
  const logoTranslateX = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const ptspRevealAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1400),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -100,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1.4,
          duration: 1200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoTranslateX, {
        toValue: -130,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLogoPTSP(true);
      setShowMask(true);

      setTimeout(() => {
        Animated.timing(ptspRevealAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: false,
        }).start(() => {
          onAnimationEnd();
        });
      }, 300);
    });
  }, [logoScale, logoTranslateX, logoTranslateY, onAnimationEnd, ptspRevealAnim, scaleAnim]);

  const maskWidth = ptspRevealAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  return (
    <View className="flex-1 items-center justify-center bg-[#1475BA]">
      <View className="items-center justify-center w-full h-full p-32">
        <Animated.Image source={require("@/assets/images/SplashScreen/circle.png")} className="w-[324px] h-[75px]" style={{ transform: [{ scale: scaleAnim }] }} />
      </View>

      <Animated.Image
        source={require("@/assets/images/logo-bmkg.png")}
        className="absolute w-[76px] h-[95px]"
        style={{
          transform: [{ translateY: logoTranslateY }, { translateX: logoTranslateX }, { scale: logoScale }],
        }}
      />

      {showLogoPTSP && (
        <View className="absolute w-80 h-20 -right-1 overflow-hidden">
          <Image source={require("@/assets/images/logo-ptsp.png")} className="w-72 h-20 absolute" />
          {showMask && <Animated.View className="absolute h-full bg-[#1475BA]" style={{ width: maskWidth, right: 0 }} />}
        </View>
      )}
    </View>
  );
}
