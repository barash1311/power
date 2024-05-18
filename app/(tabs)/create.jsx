import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { ScrollView } from "react-native";

const MachineAddingPage = () => {
  const [machineName, setMachineName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [machineDescription, setMachineDescription] = useState("");

  const handleSubmit = () => {
    console.log("Machine Name:", machineName);
    console.log("Machine Type:", machineType);
    console.log("Machine Description:", machineDescription);
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-2">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome back
              </Text>
              <Text className="text-5xl font-psemibold text-white mt-3">
                power up
              </Text>
            </View>
            <View className="mt-0.5">
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
          </View>
          <Text className="text-4xl -px-30 justify-center text-white font-bold mb-10">
            Add New Machine
          </Text>
          {/* Custom FormFields */}
          <View className="mt-20 justify-center">
            <FormField
              title="Machine Name"
              value={machineName}
              placeholder="Machine Name"
              onChangeText={setMachineName}
              containerStyles="mt-7"
              className=" mt-3 mb-4 "
              resizeMode="contain"
            />
            <View className="mt-2"></View>
            <FormField
              title="Machine Type"
              value={machineType}
              placeholder="Machine Type"
              containerStyles="mt-7"
              resizeMode="contain"
              onChangeText={setMachineType}
              className="mb-4 mt-4"
            />
            <View className="mt-2"></View>
            <FormField
              title="Machine Code"
              value={machineDescription}
              placeholder="Machine Code"
              containerStyles="mt-7"
              onChangeText={setMachineDescription}
              multiline
              className="mb-4 mt-5 "
            />

            {/* Custom Button */}
            <CustomButton
              title="Add Machine"
              handlePress={handleSubmit}
              containerStyles="bg-orange-500 p-2 rounded-md mt-7"
              textStyles="text-white text-lg"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MachineAddingPage;
