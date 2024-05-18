import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { Container } from "postcss";
import { Link } from "expo-router";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        <Link href={"/home"}>{title}</Link>
        {/* created changes here */}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
