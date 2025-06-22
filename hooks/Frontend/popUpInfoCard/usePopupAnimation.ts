// hooks/usePopupAnimation.ts
import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const usePopupAnimation = () => {
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to close the popup with fade-out animation
  const closePopup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150, // Shorter duration for fade out
      useNativeDriver: true,
    }).start(() => setActivePopupIndex(null)); // Set to null after animation completes
  };

  // Function to toggle the popup visibility for a given index
  const togglePopup = (index: number) => {
    if (activePopupIndex === index) {
      closePopup(); // Call closePopup if the same popup is clicked again
    } else {
      setActivePopupIndex(index); // Set the new active index immediately
      // The actual fade-in is handled by the useEffect below
    }
  };

  // Effect to handle fade-in animation when activePopupIndex changes
  useEffect(() => {
    if (activePopupIndex !== null) {
      fadeAnim.setValue(0); // Reset opacity to 0 instantly for a fresh fade-in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250, // Longer duration for fade in
        useNativeDriver: true,
      }).start();
    }
    // No need to add fadeAnim to dependency array as it's a ref and doesn't change
  }, [activePopupIndex, fadeAnim]); // Re-run effect when activePopupIndex changes

  return {
    activePopupIndex,
    togglePopup,
    closePopup,
    fadeAnim,
  };
};
