import { View, Text, ScrollView, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="px-6 py-2">
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
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6 py-3"
          />

          <OAuth />

          <Link
            href="/(auth)/sign-up"
            className="mt-2 flex-row text-center text-xl"
          >
            <Text className="text-general-200">Don't have an account? </Text>
            <Text className="text-primary-500">Sign up</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
