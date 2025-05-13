import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GENDER_OPTIONS = ["Laki-laki", "Perempuan"];

export default function GenderDropdown({ selected, onSelect }: any) {
  const [open, setOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (open) {
      // CLOSE dropdown
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
      // OPEN dropdown
      setOpen(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: GENDER_OPTIONS.length * 42, // Sesuaikan ukuran dropdown
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
      <Text
        className="px-6 mt-4 mb-2" //
        style={{ fontFamily: "LexBold" }}
      >
        Jenis Kelamin
      </Text>

      <TouchableOpacity onPress={toggleDropdown} style={styles.selector} activeOpacity={0.8}>
        <Text style={{ color: selected ? "black" : "green" }}>{selected || "Pilih jenis kelamin"}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color="green" />
      </TouchableOpacity>

      {open && (
        <Animated.View
          style={[
            styles.dropdown,
            {
              height: animatedHeight,
              opacity: animatedOpacity,
            },
          ]}
        >
          {GENDER_OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(option);
                toggleDropdown();
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: "#6BBC3F",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "87%",
    alignSelf: "center",
  },
  dropdown: {
    overflow: "hidden",
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: "green",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
    width: 290,
    alignSelf: "center",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: "#6BBC3F",
  },
});
