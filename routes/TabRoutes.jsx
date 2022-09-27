import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddCategoryScreen from "../screen/AddCategoryScreen";
import Dashboard from "../screen/Dashboard";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddList from "../screen/AddList";
import DetailTodo from "../screen/DetailTodo";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={{
        tabBarActiveTintColor: "red",
        header: () => null,
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-multiple"
              color={color}
              size={size}
            />
          ),
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Category"
        options={{
          tabBarLabel: "Add Category",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-sharp" color={color} size={size} />
          ),
        }}
        component={AddCategoryScreen}
      />
      <Tab.Screen
        name="Todo"
        options={{
          tabBarLabel: "Add Todo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="duplicate" color={color} size={size} />
          ),
        }}
        component={AddList}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
