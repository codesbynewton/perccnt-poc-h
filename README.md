# Investment Portfolio App

## Overview

This project is a simple Investment Portfolio app developed using **React Native** and **Expo**. The app allows users to view their investment portfolio, see the current value of each investment, and track profits or losses.

## Pre-requisites

Install Android studio and Xcode for android and ios simulator. Follow the steps mentioned in Expo official documentation page. (Link given below under resources)

## Project Setup Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/codesbynewton/perccnt-poc-h.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the app**:
    ```bash
    npx expo start
    ```

    After running the above command, Expo will start the development server, and you will have options to open the app on:
    - **Android emulator**
    - **iOS simulator**
    - **Expo Go** (for testing on a physical device)

4. **Opening the app**:
    - You can use Expo Go on your phone or an emulator to run the app.

## Sample Login Credentials

Since this app is a sample portfolio management app, the following could serve as sample credentials for the login page:
- **Username**: `demo`
- **Password**: `password`


## Libraries Used

- **React Native**: Core library for building native apps.
- **Expo**: Provides tools and libraries for easier React Native development.
- **Expo Router**: For handling navigation between screens in the app.
- **React Native Paper**: A UI library that provides Material Design components such as buttons, text inputs, etc.
- **TypeScript**: The app uses TypeScript for type safety and better developer experience.
- **React Hooks**: For managing state and lifecycle methods.

## Design Decisions

- **UI Components**: 
  - The app uses **React Native Paper** for Material Design components like buttons and text fields to provide a clean and modern user interface.
  - The portfolio screen lists investments in a **FlatList**, making it efficient to render large lists.
  - Investment returns (profit/loss) are highlighted in **green** for profit and **red** for loss to make it visually easy for users to track the status of their investments.

- **Routing**: 
  - The app uses **file-based routing** through **Expo Router**. This allows you to create pages in the `app` directory and have them automatically routed.
  - `useRouter` is used for navigating between screens and logging out users.

- **State Management**:
  - We use `useMemo` and `useCallback` hooks for optimizing performance and memoizing expensive computations like calculating total portfolio value.

## Snackbar Notifications

The app uses a **Snackbar Context** to manage global snackbars that are displayed to users. A snackbar is a message that appears briefly at the bottom of the screen to give feedback or notify users of a success, error, or other types of messages.

### SnackbarContext

A context is created using `SnackbarContext` that allows components to enqueue a message and display it in the form of a snackbar. The `SnackbarProvider` component is wrapped around the app to provide the context value.

### Features:

- **Snackbar Variants**:
  - **Message**: For general messages such as successful actions or notifications. It is styled with a green background.
  - **Error**: For error messages. It is styled with a red background.

- **Snackbar Functionality**:
  - `enqueueSnackbar`: This function can be used by other components to trigger a snackbar. It accepts a message and variant as parameters (either `'message'` or `'error'`).
  - The snackbar automatically hides after a few seconds (`duration={3000}`) and is dismissed by swiping it away or when the `onDismiss` event is triggered.


## Screens

- **Login Page**:
  - A simple login page where users can input their credentials.

- **PanCard Entry Page**:
  - A simple page where users can input their PanCard details.

- **Portfolio Screen**:
  - Displays the list of investments with their names, invested amounts, and returns.
  - Users can logout via a "Logout" button.


## Contribution

Feel free to fork and contribute to this project. If you'd like to report an issue or suggest improvements, open an issue in the repository.


## Resources

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [React Navigation documentation](https://reactnavigation.org/)
- [React Native Paper documentation](https://callstack.github.io/react-native-paper/)
