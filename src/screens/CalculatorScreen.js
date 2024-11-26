import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { calculateResult, initialState } from "../utils/calculator";
import Button from "../components/Button";
import Row from "../components/Row";
import { TouchableOpacity } from "react-native";

const HistoryButton = ({ onPress }) => (
  <Button
    onPress={onPress}
    text={<Ionicons name="time-outline" size={24} color="#fff" />}
    theme="secondary"
  />
);

export default function CalculatorScreen() {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setHistoryVisible] = useState(false);

  const handleTap = (type, value) => {
    const newState = calculateResult(type, value, state);
    setState(newState);

    if (type === "equal") {
      setHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          `${state.displayValue} = ${newState.displayValue}`,
        ];
        return newHistory.slice(-10);
      });
    }
  };

  const handleHistorySelection = (equation) => {
    const [selectedValue] = equation.split(" = ");
    setState({ ...state, displayValue: selectedValue });
    setHistoryVisible(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.value}>{state.displayValue}</Text>

        <Modal
          visible={isHistoryVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setHistoryVisible(false)}
        >
          <View style={styles.historyModal}>
            <Text style={styles.historyTitle}>History</Text>
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.historyItem}
                  onPress={() => handleHistorySelection(item)}
                >
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setHistoryVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Row>
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap("clear")}
          />
          <Button
            text="+/-"
            theme="secondary"
            onPress={() => handleTap("posneg")}
          />
          <Button
            text="%"
            theme="secondary"
            onPress={() => handleTap("percentage")}
          />
          <Button
            text="/"
            theme="accent"
            onPress={() => handleTap("operator", "/")}
          />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />
          <Button
            text="*"
            theme="accent"
            onPress={() => handleTap("operator", "*")}
          />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap("operator", "-")}
          />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />
          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap("operator", "+")}
          />
        </Row>

        <Row>
          <HistoryButton onPress={() => setHistoryVisible(true)} />
          <Button text="0" onPress={() => handleTap("number", 0)} />
          <Button text="." onPress={() => handleTap("number", ".")} />
          <Button
            text="="
            theme="accent"
            onPress={() => handleTap("equal")}
          />
        </Row>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  historyModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    justifyContent: "center",
  },
  historyTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  historyText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
