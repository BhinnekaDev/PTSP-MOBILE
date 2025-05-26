import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DropdownSelectProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  showLabel?: boolean;
  toggleDropdownClassName?: string;
  DropdownSelectClassName?: string;
  labelClassName?: string;
  iconColor?: string;
  selectedTextStyle?: object;
  FontLexSemiBold?: object;
  labelStyle?: object;
};

export default function FormDropdownSelect({
  FontLexSemiBold = { fontFamily: "LexSemiBold" }, //
  toggleDropdownClassName,
  DropdownSelectClassName,
  labelClassName,
  label,
  options,
  selected,
  onSelect,
  showLabel = true,
  iconColor,
  selectedTextStyle,
  labelStyle,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const optionHeight = 42;
  const maxVisibleOptions = 5;
  const maxHeight = optionHeight * maxVisibleOptions;

  const toggleDropdown = () => {
    if (open) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: Math.min(options.length * optionHeight, maxHeight),
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View>
      {showLabel && (
        <Text className={`text-black ${labelClassName}`} style={[FontLexSemiBold, labelStyle]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={toggleDropdown} //
        className={` self-center flex-row justify-between items-center border   p-3  ${toggleDropdownClassName}`}
        activeOpacity={0.8}
      >
        <Text className="text-black" style={[FontLexSemiBold, selectedTextStyle]}>
          {selected || `Pilih ${label.toLowerCase()}`}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color={iconColor || "black"} />
      </TouchableOpacity>

      {open && (
        <Animated.View
          style={{
            height: animatedHeight,
            opacity: animatedOpacity,
          }}
          className={` self-center overflow-hidden border border-t-0  bg-white  ${DropdownSelectClassName}`}
        >
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true} style={{ flexGrow: 0 }}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                }}
                onPress={() => {
                  onSelect(option);
                  toggleDropdown();
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
