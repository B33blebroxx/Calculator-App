import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

export const AddItemModal = ({
  visible,
  onClose,
  onSubmit,
  item = { name: '', quantity: 1 },
  isEditing = false,
}) => {
  const [newItem, setNewItem] = useState(item.name)
  const [quantity, setQuantity] = useState(item.quantity)

  useEffect(() => {
    if (visible) {
      setNewItem(item.name);
      setQuantity(item.quantity);
    }
  }, [visible, item]);

  const handleSubmit = () => {
    if (!newItem.trim()) {
      alert("Please Enter an Item Name")
      return;
    }
    onSubmit({ name: newItem.trim(), quantity });
    setNewItem('');
    setQuantity(1);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Edit Item' : 'Add New Item'}
              </Text>
              <TextInput
                placeholder="Item Name"
                style={styles.input}
                value={newItem}
                onChangeText={setNewItem}
                autoFocus={true}
                placeholderTextColor='#999'
              />
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.addItemButton]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.addButtonText}>
                      {isEditing ? 'Save Changes' : 'Add Item'}
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width - 32,
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 50,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  addItemButton: {
    backgroundColor: '#2196F3',
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
