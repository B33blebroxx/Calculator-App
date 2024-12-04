import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, TextInput, Button, Text } from "react-native-paper";

export const AddItemModal = ({ visible, onClose, onSubmit, item, isEditing }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    if (visible) {
      setName(item.name);
      setQuantity(item.quantity);
    }
  }, [visible, item]);

  const handleAddItem = () => {
    if (!name.trim()) {
      alert("Item name is required");
      return;
    }
    onSubmit({ name: name.trim(), quantity });
    setName("");
    setQuantity(1);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.title}>{isEditing ? "Edit Item" : "Add Item"}</Text>
        <TextInput
          label="Item Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Quantity"
          value={quantity.toString()}
          onChangeText={(value) => setQuantity(Number(value))}
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button onPress={onClose} mode="outlined" style={styles.button}>
            Cancel
          </Button>
          <Button onPress={handleAddItem} mode="contained" style={styles.button}>
            {isEditing ? "Save" : "Add"}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    marginBottom: 22,
    paddingBottom: 4,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
