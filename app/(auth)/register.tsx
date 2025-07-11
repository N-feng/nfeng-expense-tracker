import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Link, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/contexts/authContext";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const nameRef = React.useRef("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    console.log("register result: ", res);
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            welcome to expense tracker{" "}
          </Typo>
        </View>

        <Typo size={16} color={colors.textLighter}>
          Create an account to track your expenses
        </Typo>
        {/* form */}
        <View style={styles.form}>
          <Input
            placeholder="Enter your name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={<Icons.User size={24} color={colors.neutral800} />}
          />
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={<Ionicons name="mail" size={24} color={colors.neutral800} />}
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Ionicons
                name="lock-closed"
                size={24}
                color={colors.neutral800}
              />
            }
          />
        </View>
        {/* button */}
        <Button onPress={handleSubmit} loading={isLoading}>
          <Typo
            size={verticalScale(16)}
            fontWeight={"500"}
            color={colors.neutral800}
          >
            Register
          </Typo>
        </Button>

        {/* footer */}
        <View style={styles.footer}>
          <Link href={"/(auth)/login"}>
            <Text style={styles.footerText}> Already have an account? </Text>
            <Text style={styles.footerLinkText}>Login</Text>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
    fontWeight: "700",
    color: colors.neutral800,
    marginVertical: spacingY._40,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "700",
    color: colors.neutral800,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.neutral800,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.neutral800,
    fontSize: verticalScale(14),
  },
  footerLinkText: {
    color: colors.primary,
    fontSize: verticalScale(14),
  },
});
