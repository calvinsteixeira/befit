import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react-native'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BrandLockup, BrandMark } from '@/components/brand/brand-mark'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { colors } from '@/theme/tokens'

import { useSession } from '../session-provider'
import { createLoginSchema, type LoginFormData } from '../schemas/login'

function getAuthErrorMessage(
  error: { status?: number; message?: string } | null,
  t: (key: string) => string,
) {
  if (!error) {
    return null
  }

  if (error.status === 400 || error.message?.toLowerCase().includes('invalid login credentials')) {
    return t('auth.errors.invalidCredentials')
  }

  return t('auth.errors.unexpected')
}

export function LoginScreen() {
  const { t } = useTranslation()
  const { signIn } = useSession()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)
  const translate = useCallback((key: string) => t(key), [t])
  const loginSchema = useMemo(() => createLoginSchema(translate), [translate])
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (values: LoginFormData) => {
    setSubmitError(null)

    try {
      const { error } = await signIn(values)

      if (error) {
        setSubmitError(getAuthErrorMessage(error, translate))
      }
    } catch {
      setSubmitError(t('auth.errors.unexpected'))
    }
  }

  return (
    <SafeAreaView edges={['top', 'right', 'bottom', 'left']} className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 overflow-hidden px-6 py-8">
            <View pointerEvents="none" className="absolute -right-28 -top-20">
              <BrandMark size="ambient" className="opacity-5" />
            </View>

            <View className="mx-auto w-full max-w-md gap-10">
              <View className="gap-6">
                <BrandLockup />
                <View className="gap-2">
                  <Text className="text-base font-semibold tracking-wide text-primary">
                    {t('auth.login.tagline')}
                  </Text>
                  <Text className="text-base leading-6 text-muted-foreground">
                    {t('auth.login.description')}
                  </Text>
                </View>
              </View>

              <View className="gap-5 border-t border-border pt-6">
                <View className="gap-2">
                  <Text variant="h3" className="text-left text-3xl text-foreground">
                    {t('auth.login.title')}
                  </Text>
                  <Text className="text-base leading-6 text-muted-foreground">
                    {t('auth.login.formDescription')}
                  </Text>
                </View>

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <View className="gap-2">
                      <Text className="text-sm font-medium text-foreground">
                        {t('auth.fields.email.label')}
                      </Text>
                      <Input
                        ref={(instance) => {
                          field.ref(instance)
                          emailRef.current = instance
                        }}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={() => {
                          setFocusedField(null)
                          field.onBlur()
                        }}
                        onFocus={() => setFocusedField('email')}
                        className={cn(
                          focusedField === 'email' && 'border-primary',
                          errors.email?.message && 'border-destructive',
                        )}
                        accessibilityState={{
                          disabled: isSubmitting,
                        }}
                        accessibilityLabel={t('auth.fields.email.label')}
                        accessibilityHint={t('auth.fields.email.hint')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        editable={!isSubmitting}
                      />
                      {errors.email?.message ? (
                        <Text accessibilityLiveRegion="polite" className="text-sm text-destructive">
                          {errors.email.message}
                        </Text>
                      ) : null}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <View className="gap-2">
                      <Text className="text-sm font-medium text-foreground">
                        {t('auth.fields.password.label')}
                      </Text>
                      <View className="relative">
                        <Input
                          ref={(instance) => {
                            field.ref(instance)
                            passwordRef.current = instance
                          }}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            setFocusedField(null)
                            field.onBlur()
                          }}
                          onFocus={() => setFocusedField('password')}
                          className={cn(
                            'pr-14',
                            focusedField === 'password' && 'border-primary',
                            errors.password?.message && 'border-destructive',
                          )}
                          accessibilityState={{
                            disabled: isSubmitting,
                          }}
                          accessibilityLabel={t('auth.fields.password.label')}
                          accessibilityHint={t('auth.fields.password.hint')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          autoComplete="password"
                          textContentType="password"
                          secureTextEntry={!isPasswordVisible}
                          returnKeyType="done"
                          onSubmitEditing={handleSubmit(onSubmit)}
                          editable={!isSubmitting}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          accessibilityLabel={
                            isPasswordVisible
                              ? t('auth.actions.hidePassword')
                              : t('auth.actions.showPassword')
                          }
                          accessibilityHint={t('auth.actions.passwordVisibilityHint')}
                          onPress={() => setIsPasswordVisible((visible) => !visible)}
                          disabled={isSubmitting}
                        >
                          {isPasswordVisible ? (
                            <EyeOff color={colors.muted} size={20} aria-hidden={true} />
                          ) : (
                            <Eye color={colors.muted} size={20} aria-hidden={true} />
                          )}
                        </Button>
                      </View>
                      {errors.password?.message ? (
                        <Text accessibilityLiveRegion="polite" className="text-sm text-destructive">
                          {errors.password.message}
                        </Text>
                      ) : null}
                    </View>
                  )}
                />

                {submitError ? (
                  <View
                    accessible
                    accessibilityRole="alert"
                    className="rounded-md border border-destructive/60 bg-destructive/10 p-3"
                  >
                    <Text
                      accessibilityLiveRegion="assertive"
                      className="text-sm leading-5 text-foreground"
                    >
                      {submitError}
                    </Text>
                  </View>
                ) : null}

                <Button
                  className="mt-1 w-full"
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  accessibilityLabel={t('auth.actions.signIn')}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center gap-2">
                      <ActivityIndicator
                        color={colors.onAccent}
                        accessibilityLabel={t('auth.status.signingIn')}
                      />
                      <Text>{t('auth.status.signingIn')}</Text>
                    </View>
                  ) : (
                    <Text>{t('auth.actions.signIn')}</Text>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export { getAuthErrorMessage }
