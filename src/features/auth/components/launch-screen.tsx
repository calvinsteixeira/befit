import { useCallback, useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { BrandLockup } from '@/components/brand/brand-mark'
import { colors } from '@/theme/tokens'

interface LaunchScreenProps {
  ready: boolean
  onComplete: () => void
  onLayout: () => void
}

export function LaunchScreen({ ready, onComplete, onLayout }: LaunchScreenProps) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.94)
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null)
  const completed = useRef(false)

  const complete = useCallback(() => {
    if (!completed.current) {
      completed.current = true
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    let isMounted = true

    void AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isMounted) {
          setReduceMotion(enabled)
        }
      })
      .catch(() => {
        if (isMounted) {
          setReduceMotion(false)
        }
      })

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion)

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (!ready || reduceMotion === null) {
      return
    }

    if (reduceMotion) {
      opacity.value = 1
      scale.value = 1
      complete()
      return
    }

    opacity.value = withDelay(
      40,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
    )
    scale.value = withSequence(
      withDelay(40, withTiming(1, { duration: 620, easing: Easing.out(Easing.cubic) })),
      withDelay(
        160,
        withTiming(1, { duration: 1 }, (finished) => {
          if (finished) {
            runOnJS(complete)()
          }
        }),
      ),
    )
  }, [complete, opacity, ready, reduceMotion, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <SafeAreaView
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onLayout={onLayout}
      style={styles.container}
    >
      <Animated.View style={animatedStyle}>
        <BrandLockup markSize="hero" />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
})
