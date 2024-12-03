import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ActionModal = ({ visible, onClose, onDelete, onEdit }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.actionModalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={styles.actionModalContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  actionModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  actionModalContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    width: 200,
  },
  actionButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
