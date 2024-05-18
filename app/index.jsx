import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const loading = useGlobalContext();
  const isLogged = useGlobalContext();
  if (!loading && isLogged) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* ensure the content is visible on all the devices */}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 ">
          {/* added mt- here */}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text font-bold text-center text-purple-600  mt-8">
              Discover endless posibility with{"\n"}
              <Text className="text-secondary-200">POWER</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[132px] h-[25px] relative-bottom-2 right-15"
              resizeMode="contain"
            />
          </View>
          <Text className="text-2xl font-pregular text-gray-50 mt-9 text-center ">
            Inspire | Innovate | Empower
          </Text>
          <CustomButton
            title="continue with Email"
            handlePress={() => router.push("./(auth)/sign-in")}
            containerStyles="w-full mt-9"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* it is making our status bar become light or dark according to the setting of the os */}
    </SafeAreaView>
  );
}
