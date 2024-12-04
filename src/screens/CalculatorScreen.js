import React, { useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Surface, Text, Modal, Portal, Button as PaperButton } from "react-native-paper";
import { calculateResult, initialState } from "../utils/calculator";
import Button from "../components/Button";
import Row from "../components/Row";

export default function CalculatorScreen() {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setHistoryVisible] = useState(false);

  // Function to format display value with proper spacing
  const formatDisplayValue = (value) => {
    // Add space after operators
    return value.replace(/([+\-×÷])(\d)/g, '$1 $2');
  };

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
      <Surface style={styles.display} elevation={4}>
        <Text 
          style={styles.displayText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatDisplayValue(state.displayValue)}
        </Text>
      </Surface>

      <Portal>
        <Modal
          visible={isHistoryVisible}
          onDismiss={() => setHistoryVisible(false)}
          contentContainerStyle={styles.historyModal}
        >
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
          <PaperButton
            mode="contained"
            onPress={() => setHistoryVisible(false)}
            style={styles.closeButton}
          >
            Close
          </PaperButton>
        </Modal>
      </Portal>

      <View style={styles.buttons}>
        <Row>
          <Button text="C" theme="secondary" onPress={() => handleTap("clear")} />
          <Button text="⁺∕₋" theme="secondary" onPress={() => handleTap("posneg")} />
          <Button text="%" theme="secondary" onPress={() => handleTap("percentage")} />
          <Button text="÷" theme="accent" onPress={() => handleTap("operator", "/")} />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />
          <Button text="×" theme="accent" onPress={() => handleTap("operator", "*")} />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button text="-" theme="accent" onPress={() => handleTap("operator", "-")} />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />
          <Button text="+" theme="accent" onPress={() => handleTap("operator", "+")} />
        </Row>

        <Row>
          <Button
            text="0"
            size="double"
            onPress={() => handleTap("number", 0)}
          />
          <Button text="." onPress={() => handleTap("number", ".")} />
          <Button text="=" theme="accent" onPress={() => handleTap("equal")} />
        </Row>

        <Row>
          <PaperButton
            icon="history"
            mode="contained"
            onPress={() => setHistoryVisible(true)}
            style={styles.historyButton}
          >
            History
          </PaperButton>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "flex-end",
  },
  display: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 100,
    maxHeight: 112,
    justifyContent: "center",
    alignItems: "flex-end",
    width: "95%",
  },
  displayText: {
    fontSize: 36,
    fontWeight: "300",
    color: "#fff",
    textAlign: "right",
    flexShrink: 1,
    adjustsFontSizeToFit: true, // iOS only
    minimumFontScale: 0.6,
  },
  buttons: {
    padding: 10,
  },
  historyModal: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  historyText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  historyButton: {
    marginTop: 10,
    width: "100%",
  },
});
