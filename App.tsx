import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "./screens/Home";
import Event from "./screens/Event";
import VideoScreen from "./screens/VideoScreen";

// Types
export type StackParamList = {
  Home: undefined;
  Event: { redditEventLink: string | null };
  Stream: { url: string };
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Stream" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
