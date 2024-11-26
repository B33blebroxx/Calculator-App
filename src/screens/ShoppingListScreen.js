import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { saveShoppingList, loadShoppingList } from "../utils/storage";

export default function ShoppingListScreen() {
  const [shoppingList, setShoppingList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const loadedList = await loadShoppingList();
      setShoppingList(loadedList);
    };
    fetchShoppingList();
  }, []);

  const addItem = () => {
    if (!newItem.trim()) {
      alert("Please enter an item name");
      return;
    }
    const newItemObject = {
      id: Date.now(),
      name: newItem.trim(),
      quantity,
      acquired: false,
    };

    setShoppingList((prevList) => {
      const updatedList = [...prevList, newItemObject];
      saveShoppingList(updatedList);
      return updatedList;
    });

    setNewItem("");
    setQuantity(1);
    setModalVisible(false);
  };

  const deleteItem = (itemId) => {
    setShoppingList((prevList) => {
      const updatedList = prevList.filter(item => item.id !== itemId);
      saveShoppingList(updatedList);
      return updatedList;
    });
  };

  const toggleAcquired = (itemId) => {
    setShoppingList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.id === itemId ? { ...item, acquired: !item.acquired } : item
      );
      saveShoppingList(updatedList);
      return updatedList;
    });
  };

  const renderRightActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <Animated.View style={styles.deleteContainer}>
        <Animated.View
          style={[styles.deleteButton, {
            transform: [{ translateX: trans }],
          }]}
        >
          <TouchableOpacity
            onPress={() => deleteItem(itemId)}
            style={styles.deleteButtonInner}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.id)
        }
      >
        <TouchableOpacity
          style={styles.itemBox}
          onPress={() => toggleAcquired(item.id)}
        >
          <Text style={[styles.itemText, item.acquired && styles.acquired]}>
            {item.name} (x{item.quantity})
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add to List</Text>
        </TouchableOpacity>

        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(false);
            }}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.modalContainer}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Item</Text>
                <TextInput
                  placeholder="Item name"
                  style={styles.input}
                  value={newItem}
                  onChangeText={setNewItem}
                  autoFocus={true}
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
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.addItemButton]}
                    onPress={addItem}
                  >
                    <Text style={styles.addButtonText}>Add Item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
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
    width: 50, // Set a fixed width to prevent stretch
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
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    paddingRight: 16,
    width: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 8,
  },
  deleteButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
