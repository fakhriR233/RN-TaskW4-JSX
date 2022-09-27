import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./TabRoutes";
import DetailTodo from "../screen/DetailTodo";

const Stack = createNativeStackNavigator();

const Secondary = () => {
  return (
    <Stack.Navigator initialRouteName="Second">
      <Stack.Screen
        name="Second"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailTodo} />
    </Stack.Navigator>
  );
};

export default Secondary;
