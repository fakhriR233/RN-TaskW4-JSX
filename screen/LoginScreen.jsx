import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import {
  Center,
  Image,
  VStack,
  Text,
  HStack,
  Button,
  Link,
  Input,
  FormControl,
} from "native-base";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/userContext";

const LoginImg = require("../assets/LoginIcon.png");

const LoginScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(UserContext);

  //   const [isLogin, setIsLogin] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (title, value) => {
    setLogin({
      ...login,
      [title]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(login);
      //   setIsLogin(true);
      const res = await axios.post(
        "https://api.kontenbase.com/query/api/v1/f0a21145-1afb-41dd-af7d-598a98d9d626/auth/login",
        body,
        config
      );
      console.log(res);
      if (res?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      }

      navigation.navigate("DashboardIn");
      //   console.log(value);
    } catch (error) {
      console.log(error);
      alert(error.res.status);
    }
  };
  return (
    <View>
      <VStack space={3} justifyContent="center" mx="6">
        <Center>
          <Image source={LoginImg} resizeMode="contain" size="2xl" />
        </Center>
        <Text fontWeight="bold" fontSize="2xl" mx="1">
          Login
        </Text>
        <VStack space={3} mt="4">
          <FormControl>
            <Input
              placeholder="Email"
              fontSize="bold"
              onChangeText={(value) => handleChange("email", value)}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Password"
              fontSize="bold"
              type="password"
              onChangeText={(value) => handleChange("password", value)}
            />
          </FormControl>
          <Button colorScheme="pink" onPress={handleLogin}>
            <Text fontSize="lg" color="white" bold>
              Login
            </Text>
          </Button>
          <HStack my="4" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              New user ?{" "}
            </Text>
            <Link
              _text={{
                color: "red.500",
                fontWeight: "bold",
                fontSize: "sm",
                textDecoration: "none",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
