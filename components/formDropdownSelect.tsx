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
  label?: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  showLabel?: boolean;
  toggleDropdownClassName?: string;
  DropdownSelectClassName?: string;
  labelClassName?: string;
  iconColor?: string;
  selectedTextStyle?: object;
  selectedTextClassName?: string;
  FontLexSemiBold?: object;
  labelStyle?: object;
  maxVisibleOptions?: number;
  containerClassName?: string;
  optionTextClassName?: string;
  optionTextStyle?: object;

  // Controlled props
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function FormDropdownSelect({
  FontLexSemiBold = { fontFamily: 'LexSemiBold' },
  containerClassName,
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
  selectedTextClassName,
  optionTextClassName,
  optionTextStyle,
  labelStyle,
  maxVisibleOptions = 3,
  open,
  setOpen,
}: DropdownSelectProps) {
  const optionHeight = 42;
  const maxHeight = Math.min(
    options.length * optionHeight,
    maxVisibleOptions * optionHeight
  );

  const { animatedHeight, animatedOpacity } = useDropdownAnimation(
    open,
    maxHeight
  );

  return (
    <View className={`${containerClassName}`}>
      {/* PERBAIKAN: Cek apakah label tidak kosong */}
      {showLabel && label && label.trim() !== '' && (
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
          className={`${selectedTextClassName || 'text-[#6BBC3F]'}`}
          style={[FontLexSemiBold, selectedTextStyle]}
        >
          {selected || `Pilih ${label?.toLowerCase() || 'opsi'}`}
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
                className={`${optionTextClassName || 'text-[#6BBC3F]'}`}
                style={[{ fontFamily: 'LexRegular' }, optionTextStyle]}
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
