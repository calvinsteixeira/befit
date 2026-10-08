import { CalendarCheck2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { colors, spacing } from '@/theme/tokens'

export function AttendanceScreen() {
  const { t } = useTranslation()

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="flex-1 bg-background"
      testID="attendance-screen"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-8 px-6 py-8">
          <View className="gap-3">
            <Text variant="h1" className="text-left text-3xl text-foreground">
              {t('attendance.title')}
            </Text>
            <Text className="text-base leading-6 text-muted-foreground">
              {t('attendance.description')}
            </Text>
          </View>

          <Card className="gap-4 rounded-lg border-border bg-card p-6">
            <CalendarCheck2
              accessibilityElementsHidden
              aria-hidden={true}
              color={colors.accent}
              size={spacing.xl}
              strokeWidth={1.75}
            />
            <View className="gap-2">
              <Text variant="h3" className="text-left text-xl text-card-foreground">
                {t('attendance.historyTitle')}
              </Text>
              <Text className="text-base leading-6 text-muted-foreground">
                {t('attendance.emptyDescription')}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
