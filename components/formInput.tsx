import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;

  customFontLabel?: object;
  customFontInput?: object;
  customFontError?: object;

  textClassName?: string;
  errorMessage?: string;
}

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',

  // Custom font default
  customFontLabel = { fontFamily: 'LexBold' },
  customFontInput = { fontFamily: 'LexRegular' },
  customFontError = { fontFamily: 'LexRegular' },

  textClassName = 'border-[#6BBC3F]',
  multiline = false,
  textAlignVertical = 'top',
  errorMessage,
  ...rest
}: FormInputProps) => {
  return (
    <View className="py-1">
      {/* LABEL */}
      {label && label.trim() !== '' && (
        <Text className="mb-2" style={customFontLabel}>
          {label}
        </Text>
      )}

      {/* INPUT */}
      <TextInput
        className={`rounded-[10px] border p-4 ${textClassName}`}
        style={[
          customFontInput,
          {
            borderColor: errorMessage ? 'red' : '#6BBC3F',
            borderWidth: errorMessage ? 2 : 1,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        {...rest}
      />

      {/* ERROR */}
      {errorMessage && (
        <Text className="mt-1 text-sm text-red-600" style={customFontError}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
