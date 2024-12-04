import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import { Ionicons } from "@expo/vector-icons";
import MealPlanningScreen from "../screens/MealPlanningScreen";

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
            } else if (route.name === "Meal Planning") {
              iconName = "restaurant-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
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
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "white",
              textAlign: "center",
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen 
          name="Calculator" 
          component={CalculatorScreen}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "white",
              textAlign: "center",
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Meal Planning"
          component={MealPlanningScreen}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "white",
              textAlign: "center",
            },
            headerTitleAlign: "center",
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
