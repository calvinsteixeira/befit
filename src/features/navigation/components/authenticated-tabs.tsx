import { CalendarCheck2, House, UserRound, type LucideIcon } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import type { ColorValue } from 'react-native'
import { Tabs } from 'expo-router'

import { colors, spacing } from '@/theme/tokens'

function createTabIcon(Icon: LucideIcon, displayName: string) {
  function TabIcon({ color, focused }: { color: ColorValue; focused: boolean }) {
    return (
    <Icon
      accessibilityElementsHidden
      aria-hidden={true}
      color={color}
      size={spacing.lg}
      strokeWidth={focused ? 2.75 : 1.75}
    />
    )
  }

  TabIcon.displayName = displayName

  return TabIcon
}

export function AuthenticatedTabs() {
  const { t } = useTranslation()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.surfaceRaised,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarItemStyle: {
          minHeight: spacing.xxl,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarAccessibilityLabel: t('tabs.home'),
          tabBarIcon: createTabIcon(House, 'HomeTabIcon'),
          tabBarLabel: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          tabBarAccessibilityLabel: t('tabs.attendance'),
          tabBarIcon: createTabIcon(CalendarCheck2, 'AttendanceTabIcon'),
          tabBarLabel: t('tabs.attendance'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarAccessibilityLabel: t('tabs.profile'),
          tabBarIcon: createTabIcon(UserRound, 'ProfileTabIcon'),
          tabBarLabel: t('tabs.profile'),
        }}
      />
    </Tabs>
  )
}
