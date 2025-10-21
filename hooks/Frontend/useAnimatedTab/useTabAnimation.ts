import { useState, useRef, useEffect } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

export function useTabAnimation<GenericType extends string>(
  tabs: readonly GenericType[],
  initialTab: GenericType
) {
  const [activeTab, setActiveTab] = useState<GenericType>(initialTab);
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth, translateX, tabs]);

  const onTabPress = (tab: GenericType) => setActiveTab(tab);
  const onLayoutParent = (e: LayoutChangeEvent) =>
    setTabWidth(e.nativeEvent.layout.width / tabs.length);

  return { activeTab, translateX, tabWidth, onTabPress, onLayoutParent };
}
