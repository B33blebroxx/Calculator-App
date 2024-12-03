import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ShoppingListItem = ({ item, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.itemBox}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Text
      style={[styles.itemText, item.acquired && styles.acquired]}>
        {item.name} (x{item.quantity})
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
  acquired: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
