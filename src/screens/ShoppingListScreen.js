import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { FAB, Card, Text } from "react-native-paper";
import { saveShoppingList, loadShoppingList } from "../utils/storage";
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
      setShoppingList(loadedList || []);
    };
    fetchShoppingList();
  }, []);

  const handleAddItem = (itemData) => {
    const newItem = {
      id: isEditing ? selectedItem.id : Date.now(),
      name: itemData.name,
      quantity: itemData.quantity,
      acquired: isEditing ? selectedItem.acquired : false,
    };
    setShoppingList((prevList) => {
      const updatedList = isEditing
        ? prevList.map((item) => (item.id === selectedItem.id ? newItem : item))
        : [...prevList, newItem];
      saveShoppingList(updatedList);
      return updatedList;
    });
    setAddModalVisible(false);
    setIsEditing(false);
    setSelectedItem(null);
  };

  const toggleAcquired = (id) => {
    setShoppingList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.id === id ? { ...item, acquired: !item.acquired } : item
      );
      saveShoppingList(updatedList);
      return updatedList;
    });
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setActionModalVisible(true);
  };

  const handleDeleteItem = () => {
    setShoppingList((prevList) =>
      prevList.filter((item) => item.id !== selectedItem.id)
    );
    setActionModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={{ textAlign: "center", color: "#e6e6e6", marginBottom: 16 }}>
        Shopping List
      </Text>
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => toggleAcquired(item.id)}
            onLongPress={() => handleLongPress(item)}
          >
            <Card.Title
              title={`${item.name} (x${item.quantity})`}
              titleStyle={[styles.cardText, item.acquired && styles.acquired]}
            />
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          setIsEditing(false);
          setSelectedItem(null);
          setAddModalVisible(true);
        }}
      />
      <AddItemModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddItem}
        item={selectedItem || { name: "", quantity: 1 }}
        isEditing={isEditing}
      />
      <ActionModal
        visible={actionModalVisible}
        onClose={() => setActionModalVisible(false)}
        onDelete={handleDeleteItem}
        onEdit={() => {
          setAddModalVisible(true);
          setActionModalVisible(false);
          setIsEditing(true);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  card: {
    marginVertical: 8,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
  },
  cardText: {
    color: "#e6e6e6",
    textAlign: "center",
  },
  acquired: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#03dac6",
  },
});
