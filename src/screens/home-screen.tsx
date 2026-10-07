import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors, radius, spacing } from '@/theme/tokens'

const foundations = [
  ['01', 'Expo', 'Base nativa preparada para o desenvolvimento no iPhone.'],
  ['02', 'React Native', 'Interface mobile com componentes e comportamentos nativos.'],
  ['03', 'Supabase', 'Dados e autenticação prontos para evoluir com o produto.'],
] as const

export function HomeScreen() {
  return (
    <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <View style={styles.brandMark} accessible={false}>
            <Text style={styles.brandMarkText}>B</Text>
          </View>
          <Text style={styles.brand}>Befit</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>Base inicial</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Treino com direção</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Seu treino.{`\n`}Seu progresso.
          </Text>
          <Text style={styles.description}>
            Uma fundação mobile simples, segura e pronta para evoluir no iPhone.
          </Text>
        </View>

        <View accessibilityLabel="Tecnologias fundamentais" style={styles.foundationList}>
          {foundations.map(([number, title, description]) => (
            <View key={number} style={styles.foundationCard}>
              <Text style={styles.cardNumber}>{number}</Text>
              <View style={styles.cardCopy}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brandMark: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.accent,
  },
  brandMarkText: {
    color: colors.onAccent,
    fontSize: 18,
    fontWeight: '900',
  },
  brand: {
    marginLeft: 10,
    color: colors.foreground,
    fontSize: 18,
    fontWeight: '700',
  },
  status: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.round,
    paddingHorizontal: 12,
    paddingVertical: spacing.sm,
  },
  statusText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  hero: {
    paddingTop: 72,
    paddingBottom: 64,
  },
  eyebrow: {
    marginBottom: spacing.md,
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.foreground,
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -3.2,
    lineHeight: 51,
    textTransform: 'uppercase',
  },
  description: {
    maxWidth: 430,
    marginTop: spacing.xl,
    color: colors.muted,
    fontSize: 18,
    lineHeight: 27,
  },
  foundationList: {
    gap: 12,
  },
  foundationCard: {
    minHeight: 132,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  cardNumber: {
    color: colors.accent,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  cardCopy: {
    flex: 1,
  },
  cardTitle: {
    color: colors.foreground,
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  cardDescription: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
})
