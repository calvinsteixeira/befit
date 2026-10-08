import { Image, type ImageProps, StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { brand } from '@/theme/tokens'

const brandMarkSource = require('../../../assets/brand/befit-mark.png')

const markSizes = {
  compact: brand.markCompact,
  hero: brand.markHero,
  ambient: brand.markAmbient,
} as const

export type BrandMarkSize = keyof typeof markSizes

interface BrandMarkProps extends Omit<ImageProps, 'source' | 'style' | 'accessibilityLabel'> {
  size?: BrandMarkSize
  decorative?: boolean
  accessibilityLabel?: string
  style?: ImageProps['style']
}

export function BrandMark({
  size = 'hero',
  decorative = true,
  accessibilityLabel = 'Befit',
  style,
  ...props
}: BrandMarkProps) {
  return (
    <Image
      source={brandMarkSource}
      resizeMode="contain"
      accessible={!decorative}
      accessibilityLabel={decorative ? undefined : accessibilityLabel}
      accessibilityRole={decorative ? undefined : 'image'}
      style={[styles.mark, { width: markSizes[size], height: markSizes[size] }, style]}
      {...props}
    />
  )
}

interface BrandLockupProps {
  markSize?: BrandMarkSize
  className?: string
  wordmarkClassName?: string
  accessibilityLabel?: string
}

export function BrandLockup({
  markSize = 'hero',
  className,
  wordmarkClassName,
  accessibilityLabel = 'Befit',
}: BrandLockupProps) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      className={cn('items-center', className)}
    >
      <BrandMark size={markSize} decorative />
      <Text
        accessible={false}
        className={cn('mt-5 text-3xl font-semibold tracking-widest text-primary', wordmarkClassName)}
      >
        befit
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mark: {
    flexShrink: 0,
  },
})
