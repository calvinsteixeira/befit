import { fireEvent, render, screen } from '@testing-library/react-native'

import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Text } from './text'

describe('UI primitives', () => {
  it('expõe Button como controle acessível e responde ao toque', async () => {
    const onPress = jest.fn()

    await render(
      <Button onPress={onPress}>
        <Text>Continuar</Text>
      </Button>
    )

    fireEvent.press(screen.getByRole('button'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('renderiza Input e Card como primitives sem impor uma tela de produto', async () => {
    await render(
      <Card testID="foundation-card">
        <Input placeholder="Nome" />
      </Card>
    )

    expect(screen.getByTestId('foundation-card')).toBeOnTheScreen()
    expect(screen.getByPlaceholderText('Nome')).toBeOnTheScreen()
  })
})
