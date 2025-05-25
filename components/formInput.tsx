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
  textClassName?: string;
  multiline?: boolean;
  textAlignVertical?: "auto" | "top" | "center" | "bottom";
}

const FormInput = ({
  fontLexBold = { fontFamily: "LexBold" }, //
  textClassName,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  textAlignVertical,
}: FormInputProps) => {
  return (
    <View className="mt-4 px-6 py-1 ">
      <Text className="mb-2" style={[fontLexBold]}>
        {label}
      </Text>
      <TextInput
        className={`border  rounded-[10px] p-4 ${textClassName}`} //
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        style={{ fontFamily: "LexRegular" }}
      />
    </View>
  );
};

export default FormInput;
