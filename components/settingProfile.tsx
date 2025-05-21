// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// // OUR ICON
// import Octicons from "@expo/vector-icons/Octicons";

// // OUR COMPONENTS
// import ButtonProfile from "@/components/buttonCustom";

// // OUR PROPS
// import { SettingProfileProps } from "@/interfaces/settingProfileProps";
// import ButtonCustom from "@/components/buttonCustom";

// const SettingProfile = ({
//   label,
//   text,
//   onPress,
//   iconComponent,
//   isWrapperButton = false,
//   labelClassName, //
// }: SettingProfileProps) => {
//   const WrapperButton = isWrapperButton ? TouchableOpacity : View;

//   return (
//     // Edit Profile Component
//     <WrapperButton
//       onPress={isWrapperButton ? onPress : undefined} //
//       className="flex-row items-center justify-between py-2"
//     >
//       <ButtonCustom
//         text="Simpan"
//         iconLeft={<Octicons name="checklist" size={24} color="black" />} //
//         classNameContainer="px-4 py-2 rounded-lg"
//         textClassName="text-white text-base"
//         onPress={() => console.log("simpan")}
//         textStyle={{ fontFamily: "LexBold" }}
//       />

//       {/* LABEL */}
//       <Text className="text-black text-lg">{label}</Text>
//       <View className="flex-row items-center space-x-2">
//         {/* TEXT */}
//         <Text className="text-black opacity-50 text-lg pr-4">{text}</Text>

//         {/* BUTTON SUNTING PROFILE*/}
//         <ButtonProfile
//           classNameContainer="px-2 py-2 rounded-lg" //
//           textClassName="text-black font-semibold"
//           onPress={onPress}
//         >
//           {iconComponent}
//         </ButtonProfile>
//       </View>
//     </WrapperButton>
//   );
// };

// export default SettingProfile;
