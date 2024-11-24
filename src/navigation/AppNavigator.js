import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import CalculatorScreen from "../screens/CalculatorScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
        <Tab.Screen name="Calculator" component={CalculatorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
