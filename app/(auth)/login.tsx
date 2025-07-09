import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Login = () => {
  const emailRef = useRef("");
  const passordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: loginUser } = useAuth();

  const handleSumbit = async () => {
    if (!emailRef.current || !passordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passordRef.current);
    setIsLoading(false);
    if (res.success) {
      router.navigate("/(tabs)");
    } else {
      alert(res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* back button	 */}
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo fontWeight={"700"} size={24}>
            Sign In
          </Typo>
          <Typo fontWeight={"500"}>Enter your email and password</Typo>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Input
            icon={<Ionicons name="mail" size={24} color={colors.neutral800} />}
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={
              <Ionicons
                name="lock-closed"
                size={24}
                color={colors.neutral800}
              />
            }
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passordRef.current = value)}
          />
        </View>
        {/* forgot password */}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        {/* button */}
        <Button onPress={handleSumbit} loading={isLoading}>
          <Typo
            size={verticalScale(16)}
            fontWeight={"500"}
            color={colors.neutral800}
          >
            Login
          </Typo>
        </Button>

        {/* footer */}
        <View style={styles.footer}>
          {/* <Link href={"/auth/register"}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text style={styles.footerLinkText}>Register</Text>
          </Link> */}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

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
