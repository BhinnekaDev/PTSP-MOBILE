import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useDropdownAnimation } from '@/hooks/Frontend/dropdownAnimation/useDropdownAnimation';

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
  maxVisibleOptions?: number;

  // Controlled props
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function FormDropdownSelect({
  FontLexSemiBold = { fontFamily: 'LexSemiBold' },
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
  maxVisibleOptions = 3, // default maksimal visible
  open,
  setOpen,
}: DropdownSelectProps) {
  const optionHeight = 42;

  // Hitung maxHeight sesuai jumlah opsi tapi dibatasi maxVisibleOptions
  const maxHeight = Math.min(
    options.length * optionHeight,
    maxVisibleOptions * optionHeight
  );

  // Hook animasi
  const { animatedHeight, animatedOpacity } = useDropdownAnimation(
    open,
    maxHeight
  );

  return (
    <View className="px-6">
      {showLabel && (
        <Text
          className={`text-md mb-2 ${labelClassName}`}
          style={[FontLexSemiBold, labelStyle]}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className={`flex-row items-center justify-between rounded-xl border border-[#6BBC3F] bg-white px-4 py-3 ${toggleDropdownClassName}`}
        activeOpacity={0.8}
      >
        <Text
          style={[FontLexSemiBold, selectedTextStyle, { color: '#6BBC3F' }]}
        >
          {selected || `Pilih ${label.toLowerCase()}`}
        </Text>
        <Entypo
          name={open ? 'chevron-small-up' : 'chevron-small-down'}
          size={24}
          color={iconColor || '#6BBC3F'}
        />
      </TouchableOpacity>

      <Animated.View
        style={{ height: animatedHeight, opacity: animatedOpacity }}
        className={`mt-2 overflow-hidden rounded-xl border border-[#6BBC3F] bg-white shadow-md ${DropdownSelectClassName}`}
      >
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator
          style={{ maxHeight }}
        >
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="px-4 py-3"
            >
              <Text
                className="text-[#6BBC3F]"
                style={{ fontFamily: 'LexRegular' }}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}
