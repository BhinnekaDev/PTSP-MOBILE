import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import NotificationToggleItem from '@/components/buttonSwitchProfile';
import { WrapperSkeletonNotificationProfile } from '@/components/skeletons/wrapperSkeletonNotificationProfile';

// HOOKS
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';

// ICONS
import { Ionicons } from '@expo/vector-icons';

export default function NotificationProfile({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const showSkeleton = useSkeletonForTab();

  if (showSkeleton) {
    return <WrapperSkeletonNotificationProfile />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* HEADER */}
      <View className="bg-white px-6 pb-4 pt-12 shadow-sm">
        <ButtonCustom
          onPressLeftIcon={onClose} // ikon juga bisa diklik
          classNameContainer="absolute left-6 top-12 flex-row items-center px-2 py-2"
          textClassName="font-lexend ml-2 text-gray-600 text-base"
          iconLeft={
            <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </View>
          }
        />
        <View className="items-center justify-center">
          <Text className="font-lexend-bold text-2xl text-gray-900">
            Notifikasi
          </Text>
          <Text className="font-lexend mt-1 text-sm text-gray-500">
            Pengaturan pemberitahuan akun
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
      >
        <ScrollView
          className="mx-6 mt-6 flex-1"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
            {/* SWITCH ITEMS */}
            <NotificationToggleItem
              label="Pemberitahuan"
              value={isNotifEnabled}
              setValue={setIsNotifEnabled}
            />
            <NotificationToggleItem
              label="Email"
              value={isEmailEnabled}
              setValue={setIsEmailEnabled}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
