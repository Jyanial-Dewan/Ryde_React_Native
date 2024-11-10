import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //Create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="px-6 py-2">
          <InputField
            label="Name"
            value={form.name}
            placeholder="Enter your name"
            icon={icons.person}
            onChangeText={(text: string) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Email"
            value={form.email}
            placeholder="Enter your email"
            icon={icons.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            value={form.password}
            placeholder="Enter your password"
            icon={icons.lock}
            onChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6 py-3"
          />

          <OAuth />

          <Link
            href="/(auth)/sign-in"
            className="mt-2 flex-row text-center text-xl"
          >
            <Text className="text-general-200">Already have an account? </Text>
            <Text className="text-primary-500">Sign in</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="px-7 py-7 bg-white min-h-[300px] rounded-2xl">
            <Text className="font-JakartaExtraBold text-2xl mb-2 text-center">
              Verification
            </Text>
            <Text className="mb-5 text-center">
              We've sent an email to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="123456"
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(code: string) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-center mt-3 text-red-500">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify"
              className="py-3 bg-success-500 mt-5"
              onPress={onPressVerify}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="px-7 py-7 bg-white min-h-[300px] rounded-2xl">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold">
              Verified
            </Text>
            <Text className="text-base text-gray-500 font-Jakarta text-center mt-2">
              You have successfully verified your account!
            </Text>
            <CustomButton
              title="Browse Home"
              className="py-3 mt-5"
              onPress={() => {
                setVerification({ ...verification, state: "default" });
                router.push("/(root)/(tabs)/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
