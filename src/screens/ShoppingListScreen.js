import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { saveShoppingList, loadShoppingList } from "../utils/storage";
import { ShoppingListItem } from "../components/groceryListComponents/ShoppingListItem";
import { AddItemModal } from "../components/groceryListComponents/AddItemModal";
import { ActionModal } from "../components/groceryListComponents/ActionModal";

export default function ShoppingListScreen() {
  const [shoppingList, setShoppingList] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const loadedList = await loadShoppingList();
      setShoppingList(loadedList);
    };
    fetchShoppingList();
  }, []);

  const handleAddItem = (itemData) => {
    const newItemObject = {
      id: isEditing ? selectedItem.id : Date.now(),
      name: itemData.name,
      quantity: itemData.quantity,
      acquired: isEditing ? selectedItem.acquired : false,
    };

    setShoppingList((prevList) => {
      const updatedList = isEditing
        ? prevList.map((item) =>
            item.id === selectedItem.id ? newItemObject : item
          )
        : [...prevList, newItemObject];
      saveShoppingList(updatedList);
      return updatedList;
    });

    setAddModalVisible(false);
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = () => {
    setShoppingList((prevList) => {
      const updatedList = prevList.filter(
        (item) => item.id !== selectedItem.id
      );
      saveShoppingList(updatedList);
      return updatedList;
    });
    setActionModalVisible(false);
    setSelectedItem(null);
  };

  const handleEditItem = () => {
    setActionModalVisible(false);
    setIsEditing(true);
    setAddModalVisible(true);
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

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setActionModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setIsEditing(false);
          setSelectedItem(null);
          setAddModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Add to List</Text>
      </TouchableOpacity>

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ShoppingListItem
            item={item}
            onPress={() => toggleAcquired(item.id)}
            onLongPress={() => handleLongPress(item)}
          />
        )}
      />

      <AddItemModal
        visible={addModalVisible}
        onClose={() => {
          setAddModalVisible(false);
          setIsEditing(false);
          setSelectedItem(null);
        }}
        onSubmit={handleAddItem}
        item={selectedItem || { name: "", quantity: 1 }}
        isEditing={isEditing}
      />

      <ActionModal
        visible={actionModalVisible}
        onClose={() => {
          setActionModalVisible(false);
          setSelectedItem(null);
        }}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
