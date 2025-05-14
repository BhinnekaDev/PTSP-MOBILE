import React, { useState } from "react";
import { ScrollView, View, Text, Switch } from "react-native";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";

export default function NotificationProfile({ onClose }: { onClose: () => void }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View className="flex-1 justify-center items-center bg-transparent">
      <View className="bg-white p-6 rounded-[20px] w-[100%]" style={{ height: 700 }}>
        {/* HEADER */}
        <BackButton
          title="Notifikasi" //
          buttonClassName="mr-auto"
          textClassName="text-[23px] mr-auto"
          onPress={onClose}
        />

        {/* FORM SCROLLABLE */}
        <ScrollView
          style={{ flex: 1, marginTop: 16 }} //
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* FORM FIELDS */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl">Pemberitahuan</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#6BBC3F" }} //
              thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1 }] }} // << Ukuran diperbesar
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
