import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { HomeScreen } from '@/screens/home-screen'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <HomeScreen />
    </SafeAreaProvider>
  )
}
