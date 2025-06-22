// components/RightToLeftFlashMessage.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { FlashMessageProps } from 'react-native-flash-message'; // Import props type

interface CustomMessageProps {
  message: string;
  description?: string;
  backgroundColor?: string;
  color?: string;
  // Add any other props you might pass from showMessage
}

const { width } = Dimensions.get('window');

const RightToLeftFlashMessage: React.FC<
  FlashMessageProps & CustomMessageProps
> = ({
  message,
  description,
  backgroundColor = '#1475BA', // Default background
  color = '#FFFFFF', // Default text color
  // You might receive other FlashMessageProps here, but we're focusing on animation
  hideStatusBar, // You might need to handle this based on your StatusBar setup
  position, // The actual position prop from FlashMessage
  // ... other props from FlashMessageProps if you want to use them
}) => {
  const slideAnim = useRef(new Animated.Value(width)).current; // Start off-screen right

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to position 0 (on-screen)
      duration: 300, // Animation duration
      useNativeDriver: true, // Use native driver for better performance
    }).start();

    // Cleanup for exit animation (optional, FlashMessage handles unmounting)
    // You could also add an exit animation here if needed.
    return () => {
      slideAnim.setValue(width); // Reset for next time if component unmounts quickly
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: slideAnim }] },
        { backgroundColor },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.messageText, { color }]}>{message}</Text>
        {description && (
          <Text style={[styles.descriptionText, { color }]}>{description}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    position: 'absolute', // Important to overlay
    top: 0, // Ensure it's at the top
    left: 0,
    right: 0,
    zIndex: 9999, // Ensure it's above other content
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // Adjust as needed
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default RightToLeftFlashMessage;
