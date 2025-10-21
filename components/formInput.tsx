import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  fontLexBold?: object;
  textClassName?: string;
  errorMessage?: string;
}

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  fontLexBold = { fontFamily: 'LexBold' },
  textClassName = 'border-[#6BBC3F]',
  multiline = false,
  textAlignVertical = 'top',
  errorMessage,
  ...rest // ini menangkap props tambahan seperti maxLength, autoCapitalize, dll
}: FormInputProps) => {
  return (
    <View className="px-6 py-1">
      <Text className="mb-2" style={[fontLexBold]}>
        {label}
      </Text>
      <TextInput
        className={`rounded-[10px] border p-4 ${textClassName}`}
        style={{
          fontFamily: 'LexRegular',
          borderColor: errorMessage ? 'red' : '#6BBC3F',
          borderWidth: errorMessage ? 2 : 1,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        {...rest} // biar bisa kirim props opsional tanpa ubah komponen
      />
      {errorMessage && (
        <Text className="mt-1 text-sm text-red-600">{errorMessage}</Text>
      )}
    </View>
  );
};

export default FormInput;
