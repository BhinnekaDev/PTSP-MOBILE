import React, { useState } from "react";
import { ScrollView, View } from "react-native";

// OUR COMPONENTS
import BackButton from "@/components/headerBackButton";
import NotificationToggleItem from "@/components/buttonSwitchProfile";
export default function NotificationProfile({ onClose }: { onClose: () => void }) {
  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

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

        {/* SCROLL */}
        <ScrollView
          style={{ flex: 1, marginTop: 16 }} //
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* TOMBOL SWITCH */}
          <NotificationToggleItem
            label="Pemberitahuan" //
            value={isNotifEnabled}
            setValue={setIsNotifEnabled}
          />
          <NotificationToggleItem
            label="Email" //
            value={isEmailEnabled}
            setValue={setIsEmailEnabled}
          />
        </ScrollView>
      </View>
    </View>
  );
}
