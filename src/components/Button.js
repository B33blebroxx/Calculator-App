import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  let buttonColor = "#333333";

  if (theme === "secondary") {
    buttonColor = "#a6a6a6";
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonColor = "#2196F3";
  }

  // Using a simpler structure with just TouchableOpacity and Text
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[...buttonStyles, { backgroundColor: buttonColor }]}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        <Text style={textStyles}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    borderRadius: Math.floor(buttonWidth),
  },
  buttonContent: {
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
  },
});
