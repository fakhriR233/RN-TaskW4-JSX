import { StyleSheet, View } from "react-native";
import React from "react";
import { Center, HStack, Image, VStack, Text, Button } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/Routes";

const WaysVector = require("../assets/LandingImg.png");
const WaysTodoLogo = require("../assets/WaysToDO.png");

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <VStack space={3} justifyContent="center">
        <Center>
          <Image source={WaysVector} size="2xl"></Image>
          <Image source={WaysTodoLogo} size="xs" w="56" h="10"></Image>
        </Center>
        <VStack space={2} alignItems="center" justifyContent="center">
          <Text fontSize="sm" mx="16" textAlign="center">
            Write your activity and finish your activity. Fast, Simple and Easy
            to Use
          </Text>
        </VStack>
      </VStack>
      <Button
        colorScheme="pink"
        mx="8"
        mt="16"
        onPress={() => navigation.navigate("Login")}
      >
        <Text fontSize="lg" color="white" bold>
          Login
        </Text>
      </Button>
      <Button
        colorScheme="blueGray"
        opacity="40%"
        mx="8"
        my="4"
        onPress={() => navigation.navigate("Register")}
      >
        <Text fontSize="lg" color="white" bold>
          Register
        </Text>
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
