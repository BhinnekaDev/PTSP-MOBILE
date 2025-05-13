import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";

// Definisikan interface untuk props
interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
}

const FormInput = ({ label, value, onChangeText, placeholder, keyboardType }: FormInputProps) => {
  return (
    <View className="mt-4 px-6 py-1 ">
      <Text className="mb-2" style={{ fontFamily: "LexBold" }}>
        {label}
      </Text>
      <TextInput
        className="border border-[#6BBC3F] rounded-[10px] p-4" //
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default FormInput;
