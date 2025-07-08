import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

const Register = () => {
  const emailRef = React.useRef("");
  const nameRef = React.useRef("");
  const passordRef = React.useRef("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const handleSumbit = async () => {
    setLoading(true);
    const res = await registerUser(
      emailRef.current,
      passordRef.current,
      nameRef.current
    );
    setLoading(false);
    if (res.success) {
      router.navigate("/auth/login");
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
            Singn Up
          </Typo>
          <Typo fontWeight={"500"}>welcome to expense tracker </Typo>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Input
            icon={
              <Ionicons name="person" size={24} color={colors.neutral800} />
            }
            placeholder="Enter your Name"
            onChangeText={(value) => (nameRef.current = value)}
          />
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
        {/* button */}
        <Button onPress={handleSumbit} loading={loading}>
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
          <Link href={"/auth/login"}>
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
