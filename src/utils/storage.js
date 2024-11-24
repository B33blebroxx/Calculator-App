import AsyncStorage from "@react-native-async-storage/async-storage";

const SHOPPING_LIST_KEY = 'shopping_list';

export const saveShoppingList = async (list) => {
  try {
    const jsonValue = JSON.stringify(list);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save the shopping list", e);
  }
};

export const loadShoppingList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load the shopping list", e);
    return [];
  }
};

export const clearShoppingList = async () => {
  try {
    await AsyncStorage.removeItem(SHOPPING_LIST_KEY);
  } catch (e) {
    console.error("Failed to clear the shopping list", e);
  }
};
