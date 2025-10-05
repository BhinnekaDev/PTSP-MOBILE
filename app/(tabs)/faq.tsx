import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

// OUR ICONS
import { AntDesign } from '@expo/vector-icons';

// OUR COMPONENTS
import Navbar from '@/components/Navbar';

// OUR HOOKS
import useDropdownAnimation from '@/hooks/Frontend/faqScreen/useAnimationFaq';

// OUR CONSTANTS
import dataFaq from '@/constants/dataFaq';

// OUR INTERFACES
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

export default function FAQ({ count = 1 }: ButtonCustomProps) {
  const {
    openIndex,
    animatedValues,
    toggleDropdown,
    onContentLayout,
    measuredHeights,
  } = useDropdownAnimation(dataFaq.length);

  return (
    <View className="flex-1 gap-4 bg-[#A7CBE5]">
      {/* NAVBAR */}
      <Navbar />

      {/* BODY */}
      <View className="flex-1 px-4">
        <View className="w-full flex-1 py-6">
          <Text className="text-[20px]" style={{ fontFamily: 'LexBold' }}>
            Frequently Asked Questions
          </Text>

          <ScrollView
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {dataFaq.map((item, index) => (
              <View key={index} className="mb-4 rounded-[10px]">
                {/* Header Pertanyaan */}
                <TouchableOpacity
                  onPress={() => toggleDropdown(index)}
                  activeOpacity={0.8}
                  className="w-full flex-row items-center justify-between rounded-[10px] bg-[#3498DB] p-4"
                >
                  <View className="flex-1 pr-2">
                    <Text
                      className="text-[16px] text-white"
                      style={{ fontFamily: 'LexMedium' }}
                    >
                      {item.question}
                    </Text>
                  </View>
                  <AntDesign
                    name={openIndex === index ? 'upcircleo' : 'downcircleo'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>

                <View
                  style={{ position: 'absolute', opacity: 0, left: -9999 }}
                  onLayout={(e) =>
                    onContentLayout(index, e.nativeEvent.layout.height)
                  }
                >
                  {typeof item.answer === 'string' ? (
                    <Text
                      style={{ fontFamily: 'LexRegular' }}
                      className="text-[14px] text-gray-800"
                    >
                      {item.answer}
                    </Text>
                  ) : (
                    Array.isArray(item.answer) &&
                    item.answer.map((ans: string, i: number) => (
                      <Text
                        key={i}
                        className="mb-2 text-[14px] text-gray-800"
                        style={{ fontFamily: 'LexRegular' }}
                      >
                        • {ans}
                      </Text>
                    ))
                  )}
                </View>

                {/* Jawaban Animasi */}
                {openIndex === index && (
                  <Animated.View
                    style={{
                      height: animatedValues[index].height,
                      opacity: animatedValues[index].opacity,
                      overflow: 'hidden',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                    }}
                    className="bg-[#A7CBE5]"
                  >
                    <ScrollView
                      showsVerticalScrollIndicator
                      nestedScrollEnabled
                      scrollEnabled={measuredHeights[index] > 150}
                    >
                      {typeof item.answer === 'string' ? (
                        <Text
                          className="text-[14px] text-gray-800"
                          style={{ fontFamily: 'LexRegular' }}
                        >
                          {item.answer}
                        </Text>
                      ) : (
                        Array.isArray(item.answer) &&
                        item.answer.map((ans: string, i: number) => (
                          <Text
                            key={i}
                            className="mb-2 text-[14px] text-gray-800"
                            style={{ fontFamily: 'LexRegular' }}
                          >
                            • {ans}
                          </Text>
                        ))
                      )}
                    </ScrollView>
                  </Animated.View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* FOOTER */}
      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
