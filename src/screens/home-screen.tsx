import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/theme/tokens'

export function HomeScreen() {
  return <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.screen} testID="home-screen" />
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
