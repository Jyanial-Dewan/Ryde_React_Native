import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface TabIconProps {
  source: ImageSourcePropType;
  focused: boolean;
}

const TabIcon = ({ focused, source }: TabIconProps) => {
  return (
    <View className={`flex-row justify-center items-center rounded-full`}>
      <View
        className={`w-12 h-12 items-center justify-center rounded-full ${
          focused ? "bg-general-400" : ""
        }`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

export default TabIcon;
