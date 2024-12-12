# ListPlus: A Shopping List and Calculator App

ListPlus is a mobile application that combines a shopping list manager with a calculator, designed to simplify your shopping experience. Built with React Native and Expo, it offers a user-friendly interface for managing shopping lists and performing calculations on the go.

This app is designed to run on iOS, Android, and web platforms, providing a seamless experience across devices. ListPlus aims to streamline the shopping process by allowing users to create and manage their shopping lists while also providing a built-in calculator for quick price calculations or budget management.

## Repository Structure

```
.
├── App.js
├── app.json
├── eas.json
├── index.js
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   ├── groceryListComponents
    │   │   ├── ActionModal.js
    │   │   ├── AddItemModal.js
    │   │   └── ShoppingListItem.js
    │   └── Row.js
    ├── navigation
    │   └── AppNavigator.js
    ├── screens
    │   ├── CalculatorScreen.js
    │   └── ShoppingListScreen.js
    └── utils
        ├── calculator.js
        └── storage.js
```

Key Files:
- `App.js`: The main component of the application.
- `index.js`: The entry point of the application.
- `app.json`: Expo configuration file for the application.
- `eas.json`: Expo Application Services configuration file.
- `package.json`: Project metadata and dependencies.

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Expo CLI (v4.0.0 or later)

To install the application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ListPlus
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Getting Started

To run the application in development mode:

1. Start the Expo development server:
   ```
   npm start
   ```

2. Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal, or run on an emulator:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For web: `npm run web`

### Configuration

The application configuration can be modified in the `app.json` file. Key configuration options include:

- `name`: The display name of the application.
- `version`: The current version of the application (currently set to 1.0.0).
- `platforms`: Supported platforms (iOS, Android, web).
- `orientation`: The supported orientation (portrait).

### Common Use Cases

1. Adding items to the shopping list:
   - Navigate to the Shopping List screen.
   - Use the "Add Item" button to create a new item.
   - Enter the item details and save.

2. Using the calculator:
   - Navigate to the Calculator screen.
   - Use the provided buttons to perform calculations.
   - Access the calculation history by tapping the "History" button.

### Testing & Quality

To ensure the quality of the application, it's recommended to:

1. Run the application on different devices and platforms to verify compatibility.
2. Test all features, including adding/removing items from the shopping list and performing various calculations.
3. Verify that data persists between app restarts using AsyncStorage.

### Troubleshooting

Common issues and solutions:

1. Issue: App fails to start
   - Error message: "Unable to find expo in this project - have you run yarn / npm install yet?"
   - Solution: Ensure all dependencies are installed by running `npm install` in the project directory.

2. Issue: AsyncStorage not working
   - Error message: "Unhandled promise rejection: Error: No AsyncStorage implementation available"
   - Solution: Ensure @react-native-async-storage/async-storage is properly installed and linked. Run `expo install @react-native-async-storage/async-storage` to reinstall.

Debugging:
- To enable debug mode, shake the device while running the app and select "Debug JS Remotely".
- Log files can be found in the Expo DevTools console when running the app in development mode.

Performance optimization:
- Monitor render performance using React DevTools.
- Use React.memo() for components that don't need frequent re-renders.
- Implement virtualization for long lists using FlatList or VirtualizedList.

## Data Flow

The ListPlus app follows a unidirectional data flow pattern:

1. User interacts with the UI (e.g., adding an item to the shopping list).
2. The interaction triggers an action in the corresponding screen component.
3. The action updates the local state or calls a utility function (e.g., storage.js for persistence).
4. The updated state triggers a re-render of the affected components.
5. The UI reflects the updated state.

```
[User Input] -> [Screen Component] -> [Local State/Utils] -> [UI Update]
                      ^                       |
                      |                       |
                      +-----------------------+
                        (State/Data Updates)
```

Note: The app uses React's built-in state management. For more complex state management needs, consider implementing a state management library like Redux or MobX.