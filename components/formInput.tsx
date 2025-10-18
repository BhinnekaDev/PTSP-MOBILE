import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';

// Definisikan interface untuk props
interface FormInputProps {
  fontLexBold?: object;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  textClassName?: string;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'center' | 'bottom';
  errorMessage?: string;
}

const FormInput = ({
  fontLexBold = { fontFamily: 'LexBold' }, //
  textClassName,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  textAlignVertical,
  errorMessage,
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
      />
      {errorMessage && (
        <Text className="mt-1 text-sm text-red-600">{errorMessage}</Text>
      )}
    </View>
  );
};

export default FormInput;
