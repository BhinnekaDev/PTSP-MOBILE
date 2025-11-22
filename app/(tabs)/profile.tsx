import React from 'react';
import { View, Text, Animated, Image } from 'react-native';

// ICONS
import { MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

// OUR APPS
import EditProfile from '@/app/screens/editProfileScreen';
import NotificationProfile from '@/app/screens/notificationProfile';
import SecurityProfile from '@/app/screens/securityProfile';

// OUR COMPONENTS
import ButtonCustom from '@/components/buttonCustom';
import { WrapperSkeletonProfileTabs } from '@/components/skeletons/wrapperSkeletonProfileTabs';

// OUR HOOKS
import { useProfilePopup } from '@/hooks/Frontend/profileScreen/useProfilePopup';
import { useGetUserProfile } from '@/hooks/Backend/useGetUserProfile';
import { useSkeletonForTab } from '@/hooks/Frontend/skeletons/useSkeletonForTab';

export default function ProfileTabs() {
  const { activePopup, handleShowPopup, handleClosePopup, translateY } =
    useProfilePopup();

  const { profile, loading } = useGetUserProfile();
  const showSkeleton = useSkeletonForTab();

  // jika loading atau skeleton aktif, tampilkan skeleton
  if (loading || showSkeleton) {
    return (
      <View className="flex-1 items-center justify-center bg-[#1475BA]">
        <WrapperSkeletonProfileTabs />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1475BA]">
      {/* MAIN CONTENT */}
      {!activePopup && (
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            paddingTop: 100,
          }}
        >
          {/* HEADER PROFILE */}
          <View className="mb-6 items-center">
            <Image
              source={{
                uri:
                  // profile?.Foto_Profil ||
                  'https://cdn-icons-png.flaticon.com/512/847/847969.png',
              }}
              className="mb-4 h-28 w-28 rounded-full"
            />
            <Text
              className="text-xl text-black"
              style={{ fontFamily: 'LexBold' }}
            >
              {profile?.Nama_Lengkap ?? 'Nama tidak tersedia'}
            </Text>
            <Text
              className="mt-1 text-base text-black"
              style={{ fontFamily: 'LexRegular' }}
            >
              {profile?.Email ?? 'Email tidak tersedia'}
            </Text>
          </View>

          {/* CARD MENU */}
          <View className="h-full gap-4 rounded-2xl bg-white p-6">
            <View className="gap-10 rounded-2xl bg-[#EEEEEE] p-4">
              <ButtonCustom
                classNameContainer="flex-row items-center justify-between py-3 "
                text="Edit Profil"
                iconLeft={<Feather name="user" size={22} color="#333" />}
                iconRight={
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#999"
                    />
                  </View>
                }
                textClassName="text-black text-[16px] pl-2"
                textStyle={{ fontFamily: 'LexRegular' }}
                onPressRightIcon={() => handleShowPopup('editProfile')}
              />
              <ButtonCustom
                classNameContainer="flex-row items-center justify-between py-3"
                text="Keamanan"
                iconLeft={<Feather name="lock" size={22} color="#333" />}
                iconRight={
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#999"
                    />
                  </View>
                }
                textClassName="text-black text-[16px] pl-2"
                textStyle={{ fontFamily: 'LexRegular' }}
                onPressRightIcon={() => handleShowPopup('securityProfile')}
              />
              <ButtonCustom
                classNameContainer="flex-row items-center justify-between py-3 "
                text="Notifikasi"
                iconLeft={<Feather name="bell" size={22} color="#333" />}
                iconRight={
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#999"
                    />
                  </View>
                }
                textClassName="text-black text-[16px] pl-2"
                textStyle={{ fontFamily: 'LexRegular' }}
                onPressRightIcon={() => handleShowPopup('notificationProfile')}
              />
            </View>
            <ButtonCustom
              classNameContainer="bg-[#DC0202] py-[10px] rounded-2xl"
              text="Logout"
              textClassName="text-white text-center text-[18px]"
              textStyle={{ fontFamily: 'LexBold' }}
              onPress={() => alert('Keluar')}
            />
          </View>
        </Animated.View>
      )}

      {/* POPUP SCREENS */}
      {activePopup && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 120,
            left: 0,
            right: 0,
            height: '80%',
            backgroundColor: 'white',
            overflow: 'hidden',
            borderRadius: 20,
            transform: [{ translateY: translateY }],
          }}
        >
          {activePopup === 'editProfile' && (
            <EditProfile onClose={handleClosePopup} />
          )}
          {activePopup === 'securityProfile' && (
            <SecurityProfile onClose={handleClosePopup} />
          )}
          {activePopup === 'notificationProfile' && (
            <NotificationProfile onClose={handleClosePopup} />
          )}
        </Animated.View>
      )}
    </View>
  );
}
