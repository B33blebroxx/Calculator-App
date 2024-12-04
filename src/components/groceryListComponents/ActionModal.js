import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";

export const ActionModal = ({ visible, onClose, onDelete, onEdit }) => (
  <Portal>
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}
    >
      <View>
        <Button onPress={onEdit} mode="contained" style={styles.button}>
          Edit
        </Button>
        <Button
          onPress={onDelete}
          mode="contained"
          style={[styles.button, styles.deleteButton]}
        >
          Delete
        </Button>
      </View>
    </Modal>
  </Portal>
);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  button: {
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
  },
});
