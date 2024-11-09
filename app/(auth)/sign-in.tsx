import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {};
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
