import React, { Fragment } from "react";
import { View, Text, Image } from "react-native";

// OUR INTERFACES
import { UserProfileProps } from "@/interfaces/userProfileProps";

const UserProfile = ({
  imageUrl = "https://i.pravatar.cc/100",
  name = "Adrian Musa Alfauzan",
  email = "emailPengguna@gmail.com",
  containerImageClassName = "",
  imageClassName = "",
  nameClassName = "",
  emailClassName = "",
}: UserProfileProps) => {
  return (
    // User Profile Component
    <Fragment>
      {/* IMAGE */}
      <View className={containerImageClassName}>
        <Image source={{ uri: imageUrl }} className={imageClassName} />
      </View>

      {/* NAME */}
      <Text className={nameClassName} style={{ fontFamily: "LexXBold" }}>
        {name}
      </Text>

      {/* EMAIL */}
      <Text className={emailClassName} style={{ fontFamily: "LexMedium" }}>
        {email}
      </Text>
    </Fragment>
  );
};

export default UserProfile;
