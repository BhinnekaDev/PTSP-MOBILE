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
  containerClassName?: string;
  toggleDropdownClassName?: string;
  DropdownSelectClassName?: string;

  labelClassName?: string;
  selectedTextClassName?: string;
  optionTextClassName?: string;

  iconColor?: string;
  maxVisibleOptions?: number;

  customFontLabel?: object;
  customFontSelected?: object;
  customFontOption?: object;

  // Controlled props
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function FormDropdownSelect({
  label,
  options,
  selected,
  onSelect,

  showLabel = true,
  containerClassName,
  toggleDropdownClassName,
  DropdownSelectClassName,
  labelClassName,
  selectedTextClassName,
  optionTextClassName,
  iconColor,
  maxVisibleOptions = 3,

  customFontLabel = { fontFamily: 'LexBold' },
  customFontSelected = { fontFamily: 'LexSemiBold' },
  customFontOption = { fontFamily: 'LexRegular' },

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
      {/* LABEL */}
      {showLabel && label && label.trim() !== '' && (
        <Text
          className={`text-md mb-2 ${labelClassName}`}
          style={customFontLabel}
        >
          {label}
        </Text>
      )}

      {/* TOGGLE */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className={`flex-row items-center justify-between rounded-xl border border-[#6BBC3F] bg-white px-4 py-3 ${toggleDropdownClassName}`}
        activeOpacity={0.8}
      >
        <Text
          className={`${selectedTextClassName || 'text-[#6BBC3F]'}`}
          style={customFontSelected}
        >
          {selected || `Pilih ${label?.toLowerCase() || 'opsi'}`}
        </Text>

        <Entypo
          name={open ? 'chevron-small-up' : 'chevron-small-down'}
          size={24}
          color={iconColor || '#6BBC3F'}
        />
      </TouchableOpacity>

      {/* DROPDOWN MENU */}
      <Animated.View
        style={{ height: animatedHeight, opacity: animatedOpacity }}
        className={`mt-2 overflow-hidden rounded-xl border border-[#6BBC3F] bg-white shadow-md ${DropdownSelectClassName}`}
      >
        <ScrollView nestedScrollEnabled style={{ maxHeight }}>
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
                style={customFontOption}
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
