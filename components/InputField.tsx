import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/types";

const InputField = ({
  label,
  labelStyle,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  inputStyle,
  containerStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View className="my-w w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
          </View>
          <View
            className={`flex-row justify-start items-center bg-neutral-100 relative rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold flex-1 text-[15px] text-left ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              onChangeText={onChangeText}
              {...props}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
