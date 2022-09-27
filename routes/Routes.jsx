import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/HomeScreen";
import RegisterScreen from "../screen/RegisterScreen";
import Dashboard from "../screen/Dashboard";
import AddCategoryScreen from "../screen/AddCategoryScreen";
import MyTabs from "./TabRoutes";
import DetailTodo from "../screen/DetailTodo";
import { UserContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, setAuthToken } from "../config/api";
import Main from "./Main";
import Secondary from "./Secondary";

const Stack = createNativeStackNavigator();

const Routes = ({}) => {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("token");
  //     if (value !== null) {
  //       // value previously stored
  //       setAuthToken(value);
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (state.isLogin === false) {
  //     Navigate("/");
  //   } else {
  //     if (state.user.status === "admin") {
  //       Navigate("/listtransactions");
  //     } else if (state.user.status === "user") {
  //       Navigate("/");
  //     }
  //   }
  // }, [state]);

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null && value !== undefined) {
        // value previously stored
        setAuthToken(value);
      } else {
        return await dispatch({
          type: "AUTH_ERROR",
        });
      }

      const response = await API.post("/auth/verify-token");
      if (response.status === 404) {
        return await dispatch({
          type: "AUTH_ERROR",
        });
      }

      if (response.status === 401) {
        return await dispatch({
          type: "AUTH_ERROR",
        });
      }
      console.log(response);

      let payload = response.data;
      payload.token = await AsyncStorage.getItem("token");

      console.log(payload);

      // Send data to useContext
      await dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state?.isLogin && state?.user !== {} ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Secondary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Main}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeOut"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DashboardIn"
              component={Secondary}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
