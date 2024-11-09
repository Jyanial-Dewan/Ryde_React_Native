import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5 gap-1">
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
            className="mt-8 py-3"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
