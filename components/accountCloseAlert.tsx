import React from "react";
import { View, Text, Image } from "react-native";
import Modal from "react-native-modal";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import ButtonCustom from "@/components/buttonCustom";

// OUR INTERFACES
import { AccountCloseAlertProps } from "@/interfaces/accountCloseAlertProps";

const AccountCloseAlert = ({ visible, onClose, onConfirm }: AccountCloseAlertProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriver={true}
      animationInTiming={500}
      animationOutTiming={800}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-[#6BBC3F] h-[60%] rounded-t-2xl p-6 justify-between">
        {/* HEADER CLOSE BUTTON */}
        <View className="absolute right-4 top-4 z-10">
          <ButtonCustom classNameContainer="p-2 rounded-full" iconRight={<MaterialIcons name="close" size={20} color="white" />} textClassName="hidden" onPress={onClose} />
        </View>

        {/* ISI UTAMA */}
        <View className="items-center mt-10 ">
          <Text className="text-white text-lg uppercase mb-10" style={{ fontFamily: "LexXBold" }}>
            Yakin ingin Menutup Akun Anda?
          </Text>
          <Image source={require("@/assets/images/ProfileScreen/iconTutupAkun.png")} className="w-50 h-50" />
        </View>

        {/* PESAN DAN TOMBOL */}
        <View className="py-6">
          <Text className="text-gray-300 text-center text-[12px] mb-6" style={{ fontFamily: "LexXBold" }}>
            Sebelum menutup akun, pastikan semua permohonan layanan sudah selesai, data penting telah disimpan, dan tidak ada proses yang masih berlangsung. Setelah akun ditutup, Anda tidak dapat lagi mengakses riwayat permohonan atau
            informasi yang terkait, dan akun tidak dapat dipulihkan.
          </Text>

          {/* TOMBOL MERAH DI BAWAH */}
          <ButtonCustom
            classNameContainer="px-4 py-2 rounded-lg bg-[#DC0202] w-[50%] self-center" //
            textClassName="text-black text-[20px] text-center"
            text="Keamanan"
            textStyle={{ fontFamily: "LexBold" }}
            onPress={onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AccountCloseAlert;
