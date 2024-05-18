import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
// import empty from "../assets/images/empty.png";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-150 h-200"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-center text-white">
        {subtitle}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <CustomButton
        title="create a machine"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
