import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";

// Definisikan interface untuk props
interface FormInputProps {
  fontLexBold?: object;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
}

const FormInput = ({
  fontLexBold = { fontFamily: "LexBold" }, //
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: FormInputProps) => {
  return (
    <View className="mt-4 px-6 py-1 ">
      <Text className="mb-2" style={[fontLexBold]}>
        {label}
      </Text>
      <TextInput
        className="border border-[#6BBC3F] rounded-[10px] p-4" //
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{ fontFamily: "LexRegular" }}
      />
    </View>
  );
};

export default FormInput;
