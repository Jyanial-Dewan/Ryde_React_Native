import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignin = async () => {};
  return (
    <View>
      <View className="flex flex-row gap-3 justify-center items-center mt-4">
        <View className="h-[0.7px] flex-1 bg-general-100" />
        <Text>OR</Text>
        <View className="h-[0.7px] flex-1 bg-general-100" />
      </View>

      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full py-3 shadow-none"
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignin}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="h-5 w-5 mx-2"
          />
        )}
      />
    </View>
  );
};

export default OAuth;
