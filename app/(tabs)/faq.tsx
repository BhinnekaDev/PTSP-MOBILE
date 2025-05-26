import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Animated } from "react-native";

// OUR ICONS
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// OUR COMPONENTS
import ButtonShopAndChat from "@/components/buttonShopAndChat";

// OUR HOOKS
import useDropdownAnimation from "@/hooks/Frontend/faqScreen/useAnimationFaq";

// OUR CONSTANTS
import dataFaq from "@/constants/dataFaq";

// OUR INTERFACES
import { ButtonCustomProps } from "@/interfaces/buttonCustomProps";

export default function FAQ({ count = 1 }: ButtonCustomProps) {
  const { openIndex, animatedValues, toggleDropdown } = useDropdownAnimation(dataFaq.length);

  return (
    <View className="flex-1 bg-white gap-4">
      {/* HEADER */}
      <View className="bg-[#1475BA] flex-row justify-between w-full items-center px-6 pb-4 rounded-b-[10px] shadow-md">
        <Image source={require("@/assets/images/HomeScreen/logo.png")} className="w-44 h-12 object-cover" />
        <View className="flex-row gap-6 items-center">
          <ButtonShopAndChat />
        </View>
      </View>

      {/* BODY */}
      <View className="flex-1 px-4">
        <View className="flex-1 w-full py-6">
          <Text className="font-bold text-[20px]" style={{ fontFamily: "LexBold" }}>
            Frequently Asked Questions
          </Text>

          <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
            {dataFaq.map((item, index) => (
              <View key={index} className="bg-white rounded-[10px] mb-4">
                {/* Header Pertanyaan */}
                <TouchableOpacity onPress={() => toggleDropdown(index)} activeOpacity={0.8} className="bg-[#3498DB] rounded-[10px] w-full p-4 flex-row justify-between items-center">
                  <View className="flex-1 pr-2">
                    <Text className="text-[16px] text-black" style={{ fontFamily: "LexMedium" }}>
                      {item.question}
                    </Text>
                  </View>
                  <MaterialIcons name={openIndex === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
                </TouchableOpacity>

                {/* Jawaban */}
                {openIndex === index && (
                  <Animated.View
                    style={{
                      height: animatedValues[index].height,
                      opacity: animatedValues[index].opacity,
                      overflow: "hidden",
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                    }}
                  >
                    <ScrollView showsVerticalScrollIndicator nestedScrollEnabled>
                      {item.answerType === "text" || typeof item.answer === "string" ? (
                        <Text className="text-[14px] text-gray-800" style={{ fontFamily: "LexRegular" }}>
                          {item.answer}
                        </Text>
                      ) : Array.isArray(item.answer) ? (
                        item.answer.map((ans: string, i: number) => (
                          <Text key={i} className="text-[14px] text-gray-800 mb-2" style={{ fontFamily: "LexRegular" }}>
                            • {ans}
                          </Text>
                        ))
                      ) : null}
                    </ScrollView>
                  </Animated.View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* FOOTER */}
      <View className="w-full bg-[#1475BA] h-[4%]" />
    </View>
  );
}
