import React from "react";
import { StyleSheet, View } from "react-native";

export default Row = ({ children }) => {
  return (
    <View style={styles.container}>{children}</View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
})
