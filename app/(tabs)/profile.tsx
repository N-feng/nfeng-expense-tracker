import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/imagesService";
import { UserDataType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

const MENU_ITEMS = [
  {
    icon: <AntDesign name="user" size={24} color={colors.primary} />,
    title: "Edit Profile",
    route: "(modals)/profileModal",
  },
  {
    icon: (
      <MaterialIcons name="favorite-border" size={24} color={colors.primary} />
    ),
    title: "Favourites",
    route: "favourites",
  },
  {
    icon: <MaterialIcons name="privacy-tip" size={24} color={colors.primary} />,
    title: "Privacy & Policy",
    route: "privacyAndPolicy",
  },
  {
    icon: <Ionicons name="settings-outline" size={24} color={colors.primary} />,
    title: "Settings",
    route: "settings",
  },
];

const ProfileScreen = () => {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";
  const { user, updateUserData } = useAuth();
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });

  const handleLogout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    if (user) {
      setUserData((prevState) => ({
        ...prevState,
        image: user.image || null,
        name: user.name || "",
      }));
    }
  }, [user]);

  const renderProfileImage = () => {
    const imageSource = userData.image
      ? {
          uri:
            typeof userData.image === "string"
              ? userData.image
              : userData.image.uri,
        }
      : getProfileImage(null);

    return (
      <Image source={imageSource} style={styles.avatar} resizeMode="cover" />
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginTop: spacingY._10 }} />

        {/* user info */}
        <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            {/* user image */}
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              resizeMode="cover"
              // transition={100}
            />
          </View>
          {/* name & email */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});

export default ProfileScreen;
