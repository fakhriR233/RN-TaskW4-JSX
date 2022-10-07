import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Center,
  Image,
  VStack,
  Text,
  FormControl,
  Input,
  Button,
  HStack,
  Link,
  Alert,
} from "native-base";

const LoginImg = require("../assets/LoginIcon.png");

const RegisterScreen = ({ navigation }) => {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  //   const { firstName, email, password } = form;

  const handleChange = (title, value) => {
    setForm({
      ...form,
      [title]: value,
    });
  };

  const handleRegister = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await axios.post(
        "https://api.kontenbase.com/query/api/v1/f0a21145-1afb-41dd-af7d-598a98d9d626/auth/register",
        body,
        config
      );

      //console.log(response.data);

      if (response) {
        await AsyncStorage.setItem("token", response.data.token);
        const alert = (
          <Alert variant="outline" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
        setForm({
          firtName: "",
          email: "",
          password: "",
        });

        const value = await AsyncStorage.getItem("token");
        if (value != null) {
          console.log(value);
          navigation.navigate("Login");
        }
      } else {
        const alert = (
          <Alert variant="solid" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="solid" className="py-1">
          Failed{" "}
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <View>
      <VStack space={3} justifyContent="center" mx="6">
        <Center>
          <Image source={LoginImg} resizeMode="contain" size="2xl" />
        </Center>
        <Text fontWeight="bold" fontSize="2xl" mx="1">
          Register
        </Text>
        <VStack space={3} mt="4">
          <FormControl>
            <Input
              type="email"
              placeholder="Email"
              fontSize="bold"
              onChangeText={(value) => handleChange("email", value)}
              value={form.email}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Name"
              fontSize="bold"
              onChangeText={(value) => handleChange("firstName", value)}
              value={form.firstName}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Password"
              fontSize="bold"
              type="password"
              onChangeText={(value) => handleChange("password", value)}
              value={form.password}
            />
          </FormControl>
          <Button colorScheme="pink" onPress={handleRegister}>
            <Text fontSize="lg" color="white" bold>
              Register
            </Text>
          </Button>
          <HStack my="3" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Joined us before ?{" "}
            </Text>
            <Link
              _text={{
                color: "red.500",
                fontWeight: "bold",
                fontSize: "sm",
                textDecoration: "none",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
