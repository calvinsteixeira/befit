import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { colors } from '@/theme/tokens'

import { useSession } from '../session-provider'
import { loginSchema, type LoginFormData } from '../schemas/login'

const invalidCredentialsMessage = 'E-mail ou senha inválidos.'
const unexpectedErrorMessage =
  'Não foi possível entrar agora. Verifique sua conexão e tente novamente.'

function getAuthErrorMessage(error: { status?: number; message?: string } | null) {
  if (!error) {
    return null
  }

  if (error.status === 400 || error.message?.toLowerCase().includes('invalid login credentials')) {
    return invalidCredentialsMessage
  }

  return unexpectedErrorMessage
}

export function LoginScreen() {
  const { signIn } = useSession()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
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
        setSubmitError(getAuthErrorMessage(error))
      }
    } catch {
      setSubmitError(unexpectedErrorMessage)
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
          <View className="flex-1 justify-center gap-8 px-6 py-8">
            <View accessible accessibilityLabel="Befit" className="gap-3">
              <Text className="text-4xl font-semibold tracking-tight text-foreground">Befit</Text>
              <Text variant="h2" className="text-left text-3xl text-foreground">
                Bem-vindo de volta
              </Text>
              <Text className="text-base leading-6 text-muted-foreground">
                Entre para continuar sua jornada de treino.
              </Text>
            </View>

            <Card className="w-full gap-5 p-6">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <View className="gap-2">
                    <Text className="text-sm font-medium text-foreground">E-mail</Text>
                    <Input
                      ref={(instance) => {
                        field.ref(instance)
                        emailRef.current = instance
                      }}
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      accessibilityLabel="E-mail"
                      accessibilityHint="Digite o e-mail da sua conta"
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
                    <Text className="text-sm font-medium text-foreground">Senha</Text>
                    <View className="relative">
                      <Input
                        ref={(instance) => {
                          field.ref(instance)
                          passwordRef.current = instance
                        }}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        className="pr-14"
                        accessibilityLabel="Senha"
                        accessibilityHint="Digite sua senha"
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
                          isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
                        }
                        accessibilityHint="Alterna a visibilidade da senha"
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
                accessibilityLabel="Entrar"
              >
                {isSubmitting ? (
                  <ActivityIndicator color={colors.onAccent} accessibilityLabel="Entrando" />
                ) : (
                  <Text>Entrar</Text>
                )}
              </Button>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export { getAuthErrorMessage, invalidCredentialsMessage, unexpectedErrorMessage }
