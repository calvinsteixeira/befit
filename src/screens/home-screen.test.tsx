import { render, screen } from '@testing-library/react-native'

import { HomeScreen } from './home-screen'

describe('HomeScreen', () => {
  it('mantém uma base visual vazia para as próximas funcionalidades', async () => {
    await render(<HomeScreen />)

    expect(screen.getByTestId('home-screen')).toBeOnTheScreen()
    expect(screen.queryByText('Befit')).not.toBeOnTheScreen()
  })
})
