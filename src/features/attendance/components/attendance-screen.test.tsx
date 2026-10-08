import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { I18nextProvider } from 'react-i18next'

import i18n, { i18nReady } from '@/i18n'

import { AttendanceScreen } from './attendance-screen'
import { addLocalDays, addLocalMonths, getLocalDateKey, getLocalMonthKey } from '../utils/local-date'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'pt-BR' }],
}))
jest.mock('lucide-react-native', () => ({
  Check: () => null,
  ChevronLeft: () => null,
  ChevronRight: () => null,
}))
jest.mock('@/features/attendance/hooks/use-attendance', () => ({
  getCurrentAttendanceMonth: jest.fn(),
  useAttendanceMonth: jest.fn(),
  useConfirmAttendance: jest.fn(),
  useRemoveAttendance: jest.fn(),
}))

const attendanceHooks = jest.requireMock('@/features/attendance/hooks/use-attendance') as {
  getCurrentAttendanceMonth: jest.Mock
  useAttendanceMonth: jest.Mock
  useConfirmAttendance: jest.Mock
  useRemoveAttendance: jest.Mock
}
const todayKey = getLocalDateKey()
const monthKey = getLocalMonthKey()
const markedDateKey = addLocalDays(todayKey, -1)
const futureDateKey = addLocalDays(todayKey, 1)
const mockConfirmAsync = jest.fn()
const mockRemoveAsync = jest.fn()

function renderAttendance() {
  return render(
    <I18nextProvider i18n={i18n}>
      <AttendanceScreen />
    </I18nextProvider>,
  )
}

describe('AttendanceScreen', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    mockConfirmAsync.mockReset().mockResolvedValue(undefined)
    mockRemoveAsync.mockReset().mockResolvedValue(undefined)
    attendanceHooks.getCurrentAttendanceMonth.mockReturnValue(monthKey)
    attendanceHooks.useAttendanceMonth.mockImplementation((requestedMonthKey: string) => ({
      isLoading: false,
      isError: false,
      data: {
        monthKey: requestedMonthKey,
        records: [
          {
            id: 'attendance-1',
            userId: 'user-1',
            attendedOn: markedDateKey,
            createdAt: `${markedDateKey}T12:00:00.000Z`,
          },
        ],
      },
      refetch: jest.fn(),
    }))
    attendanceHooks.useConfirmAttendance.mockReturnValue({ mutateAsync: mockConfirmAsync })
    attendanceHooks.useRemoveAttendance.mockReturnValue({ mutateAsync: mockRemoveAsync })
  })

  it('monta o mês em uma grade de sete colunas e impede avançar ao futuro', async () => {
    await i18nReady
    await renderAttendance()

    expect(screen.getByTestId('calendar-grid')).toBeOnTheScreen()
    expect(screen.getAllByTestId(/^calendar-day-/)).toHaveLength(
      new Date(Number(monthKey.slice(0, 4)), Number(monthKey.slice(5, 7)), 0).getDate(),
    )
    expect(screen.getByTestId('calendar-next-month').props.accessibilityState.disabled).toBe(true)
    const weekdays = i18n.t('attendance.calendar.weekdaysShort', {
      returnObjects: true,
    }) as unknown as string[]
    expect(screen.getAllByText(weekdays[0]).length).toBeGreaterThan(0)
  })

  it('navega para meses passados sem permitir um mês futuro', async () => {
    await i18nReady
    await renderAttendance()

    await fireEvent.press(screen.getByTestId('calendar-previous-month'))

    await waitFor(() => {
      expect(attendanceHooks.useAttendanceMonth).toHaveBeenLastCalledWith(addLocalMonths(monthKey, -1))
    })
  })

  it('marca e remove uma presença pelo toque da célula', async () => {
    let resolveConfirm: (() => void) | undefined
    let resolveRemove: (() => void) | undefined
    mockConfirmAsync.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveConfirm = resolve
      }),
    )
    mockRemoveAsync.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveRemove = resolve
      }),
    )

    await i18nReady
    await renderAttendance()

    await fireEvent.press(screen.getByTestId(`calendar-day-${todayKey}`))
    await fireEvent.press(screen.getByTestId(`calendar-day-${markedDateKey}`))

    await waitFor(() => {
      expect(screen.getByTestId(`calendar-day-${todayKey}`).props.accessibilityState.disabled).toBe(true)
    })
    await waitFor(() => {
      expect(mockConfirmAsync).toHaveBeenCalledWith(todayKey)
      expect(mockRemoveAsync).toHaveBeenCalledWith(markedDateKey)
    })

    resolveConfirm?.()
    resolveRemove?.()
    await waitFor(() => {
      expect(screen.getByTestId(`calendar-day-${todayKey}`).props.accessibilityState.disabled).toBe(false)
    })
    await waitFor(() => {
      expect(screen.getByTestId(`calendar-day-${markedDateKey}`).props.accessibilityState.disabled).toBe(false)
    })
  })

  it('desabilita somente a célula em mutation e mantém dias futuros inativos', async () => {
    let resolveConfirm: (() => void) | undefined
    mockConfirmAsync.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveConfirm = resolve
      }),
    )

    await i18nReady
    await renderAttendance()
    await fireEvent.press(screen.getByTestId(`calendar-day-${todayKey}`))

    await waitFor(() => {
      expect(screen.getByTestId(`calendar-day-${todayKey}`).props.accessibilityState.disabled).toBe(true)
    })
    expect(screen.getByTestId(`calendar-day-${markedDateKey}`).props.accessibilityState.disabled).toBe(false)
    expect(screen.getByTestId(`calendar-day-${futureDateKey}`).props.accessibilityState.disabled).toBe(true)

    resolveConfirm?.()
    await waitFor(() => {
      expect(screen.getByTestId(`calendar-day-${todayKey}`).props.accessibilityState.disabled).toBe(false)
    })
  })

  it('expõe labels acessíveis com data, estado e ação', async () => {
    await i18nReady
    await renderAttendance()

    expect(screen.getByTestId(`calendar-day-${markedDateKey}`).props.accessibilityLabel).toMatch(
      /presença marcada.*remover presença/i,
    )
    expect(screen.getByTestId(`calendar-day-${todayKey}`).props.accessibilityLabel).toMatch(
      /sem presença registrada.*marcar presença/i,
    )
    expect(screen.getByTestId(`calendar-day-${futureDateKey}`).props.accessibilityLabel).toMatch(
      /dia futuro.*indisponível/i,
    )
  })
})
