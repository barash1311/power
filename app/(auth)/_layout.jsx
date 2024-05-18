import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import GlobalProvider from "../../context/GlobalProvider";

const AuthLayout = () => {
  return (
    <>
      {/* now from here we are creating the authentication 1.sign in and sign up page */}
      <GlobalProvider>
        <Stack>
          {/* sign in */}
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          {/* sign up */}
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
            }}
          />
          <StatusBar backgroundColor="#161622" style="light" />
        </Stack>
      </GlobalProvider>
    </>
  );
};

export default AuthLayout;
