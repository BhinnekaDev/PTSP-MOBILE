import { useState, useEffect } from "react";
import * as Font from "expo-font";

export function useLoadFont() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        LexBlack: require("@/assets/fonts/Lexend-Black.ttf"),
        LexBold: require("@/assets/fonts/Lexend-Bold.ttf"),
        LexXBold: require("@/assets/fonts/Lexend-ExtraBold.ttf"),
        LexXLight: require("@/assets/fonts/Lexend-ExtraLight.ttf"),
        LexLight: require("@/assets/fonts/Lexend-Light.ttf"),
        LexMedium: require("@/assets/fonts/Lexend-Medium.ttf"),
        LexRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
        LexSemiBold: require("@/assets/fonts/Lexend-SemiBold.ttf"),
        LexThin: require("@/assets/fonts/Lexend-Thin.ttf"),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  return fontLoaded;
}
