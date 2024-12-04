import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export const ShoppingListItem = ({ item, onPress, onLongPress }) => (
  <Card
    style={styles.card}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Card.Content>
      <Text
        variant="bodyLarge"
        style={[styles.text, item.acquired && styles.acquired]}
      >
        {item.name} (x{item.quantity})
      </Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#e0e0e0", // Light text for better contrast
  },
  acquired: {
    textDecorationLine: "line-through",
    color: "#a8a8a8", // Dimmer gray for acquired items
  },
});
