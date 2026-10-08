import { SafeAreaView } from 'react-native-safe-area-context'

export function HomeScreen() {
  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      className="flex-1 bg-background"
      testID="home-screen"
    />
  )
}
