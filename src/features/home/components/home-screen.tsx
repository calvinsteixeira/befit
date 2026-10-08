import { CircleDashed } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'

import { getHomeGreetingKey } from '../utils/get-home-greeting'

export function HomeScreen() {
  const { t } = useTranslation()

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="flex-1 bg-background"
      testID="home-screen"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-8 px-6 py-8">
          <View className="gap-2">
            <Text className="text-base font-semibold tracking-wide text-primary">
              {t(getHomeGreetingKey(new Date().getHours()))}
            </Text>
            <Text variant="h1" className="text-left text-3xl text-foreground">
              {t('home.title')}
            </Text>
          </View>

          <Card className="gap-3 rounded-lg border-border bg-card p-5">
            <CircleDashed
              accessibilityElementsHidden
              aria-hidden={true}
              color={colors.accent}
              size={spacing.xl}
              strokeWidth={1.75}
            />
            <View className="gap-2">
              <Text variant="h3" className="text-left text-xl text-card-foreground">
                {t('home.empty.title')}
              </Text>
              <Text className="text-base leading-6 text-muted-foreground">
                {t('home.empty.description')}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
