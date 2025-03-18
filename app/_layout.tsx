import { Stack } from "expo-router"
import { SnackbarProvider } from "./utils/SnackBarContext"
import { Provider } from 'react-redux'
import store from "./store/store"
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context"

export default function RootLayout() {
  const safeArea = useSafeAreaInsets()

  return (
    <SafeAreaProvider style={{ paddingTop: safeArea.top}}>
      <Provider store={store}>
        <SnackbarProvider>
          <Stack screenOptions={{ headerShown:false }} />
        </SnackbarProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
