import { View, Text, Switch } from "react-native";

type buttonSwitchProfileProps = {
  fontLexRegular?: object;
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function buttonSwitchProfile({
  fontLexRegular = { fontFamily: "LexRegular" }, //
  label,
  value,
  setValue,
}: buttonSwitchProfileProps) {
  return (
    <View className="flex-row items-center px-6 justify-between py-4">
      <Text className="text-[15px]" style={[fontLexRegular]}>
        {label}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#6BBC3F" }}
        thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setValue((prev) => !prev)}
        value={value}
        style={{
          transform: [{ scaleX: 1.05 }, { scaleY: 1 }],
        }}
      />
    </View>
  );
}
