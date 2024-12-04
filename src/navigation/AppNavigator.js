import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Shopping List") {
              iconName = "list-outline";
            } else if (route.name === "Calculator") {
              iconName = "calculator-outline";
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "black", // Black background for tab navigator
          },
        })}
      >
        <Tab.Screen 
          name="Shopping List" 
          component={ShoppingListScreen}
        />
        <Tab.Screen 
          name="Calculator" 
          component={CalculatorScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
