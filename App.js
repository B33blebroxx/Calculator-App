import React, { useEffect } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle("light-content"); // Inverts text and icon colors to be visible on dark backgrounds
    StatusBar.setBackgroundColor("#333"); // Set the status bar background to dark (or any color that fits your theme)
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
});
