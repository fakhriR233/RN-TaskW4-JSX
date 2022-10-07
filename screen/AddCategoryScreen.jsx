import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VStack,
  Text,
  View,
  Button,
  FormControl,
  Input,
  HStack,
  Box,
  Flex,
  ScrollView,
} from "native-base";
import Footer from "../components/Footer";
import { API, setAuthToken } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const AddCategoryScreen = () => {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    category: "",
  });

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const handleChange = (title, value) => {
    setForm({
      ...form,
      backgroundColor: randomColor,
      [title]: value,
    });
  };

  // const [category, setCategory] = useState([]);

  let { data: categories, refetch } = useQuery("Cache", async () => {
    const response = await API.get("/Category");
    console.log(response.data);
    return response.data;
  });

  // let dataCategory = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   setAuthToken(token);
  //   const response = await API.get("/Category");
  //   // console.log(response.data);
  //   setCategory(response.data);
  // };

  const handleCategorySubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setAuthToken(token);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      //   setIsLogin(true);
      const res = await API.post("/Category", body, config);
      setForm({
        category: "",
      });
      refetch();
      console.log(res);
      //   console.log(value);
    } catch (error) {
      console.log(error);
      alert(error.res.status);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, [categories]);

  return (
    <>
      <VStack space={1} mx="5" my="2">
        <Text fontSize="24" fontWeight="bold">
          Add Category
        </Text>
        <FormControl my="5">
          <Input
            placeholder="Category"
            backgroundColor="gray.200"
            placeholderTextColor="black"
            size="md"
            onChangeText={(value) => handleChange("category", value)}
          />
        </FormControl>
        <Button colorScheme="pink" onPress={handleCategorySubmit}>
          <Text fontSize="20" fontWeight="bold" color="white">
            {" "}
            Add Category{" "}
          </Text>
        </Button>
      </VStack>
      <Text fontSize="24" fontWeight="bold" mx="5" my="2">
        List Category
      </Text>
      <ScrollView>
        <VStack space={1} mx="5" my="1" maxW="xs">
          {categories?.length !== 0 ? (
            <>
              <HStack space={2} my="2" maxWidth="xs" flexWrap="wrap">
                {categories?.map((item, id) => {
                  return (
                    <Box
                      key={id + 10}
                      backgroundColor={`#${item?.backgroundColor}`}
                      borderRadius={4}
                      my="3"
                    >
                      <Text mx="3" my="2" bold color="white">
                        {item?.category}
                      </Text>
                    </Box>
                  );
                })}
              </HStack>
            </>
          ) : (
            <>
              <Text p="5" mx="2" my="2">
                No Category Yet!
              </Text>
            </>
          )}
        </VStack>
      </ScrollView>
      {/* <Footer /> */}
    </>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({});
