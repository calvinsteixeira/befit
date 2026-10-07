import { render, screen } from '@testing-library/react-native'

import { HomeScreen } from './home-screen'

describe('HomeScreen', () => {
  it('apresenta a fundação tecnológica do Befit', async () => {
    await render(<HomeScreen />)

    expect(screen.getByRole('header', { name: 'Seu treino. Seu progresso.' })).toBeOnTheScreen()
    expect(screen.getByText('Expo')).toBeOnTheScreen()
    expect(screen.getByText('React Native')).toBeOnTheScreen()
    expect(screen.getByText('Supabase')).toBeOnTheScreen()
  })
})
