import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import Routes from "./routes/Routes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UserContextProvider } from "./context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "./config/api";

import { QueryClient, QueryClientProvider } from "react-query";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const client = new QueryClient();

export default function App() {
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <QueryClientProvider client={client}>
            <Routes />
          </QueryClientProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </UserContextProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
