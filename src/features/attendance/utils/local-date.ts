export interface CalendarCell {
  dateKey: string | null
  dayNumber: number | null
}

function padDatePart(value: number) {
  return value.toString().padStart(2, '0')
}

function dateFromLocalKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function dateFromMonthKey(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1)
}

export function getLocalDateKey(date: Date = new Date()) {
  return [date.getFullYear(), padDatePart(date.getMonth() + 1), padDatePart(date.getDate())].join('-')
}

export function getLocalMonthKey(date: Date = new Date()) {
  return [date.getFullYear(), padDatePart(date.getMonth() + 1)].join('-')
}

export function addLocalDays(dateKey: string, amount: number) {
  const date = dateFromLocalKey(dateKey)
  date.setDate(date.getDate() + amount)
  return getLocalDateKey(date)
}

export function addLocalMonths(monthKey: string, amount: number) {
  const date = dateFromMonthKey(monthKey)
  date.setMonth(date.getMonth() + amount)
  return getLocalMonthKey(date)
}

export function getMonthDateRange(monthKey: string) {
  const firstDay = dateFromMonthKey(monthKey)
  const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)

  return {
    from: getLocalDateKey(firstDay),
    to: getLocalDateKey(lastDay),
  }
}

export function buildMonthCalendarGrid(monthKey: string): CalendarCell[] {
  const firstDay = dateFromMonthKey(monthKey)
  const year = firstDay.getFullYear()
  const month = firstDay.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const cells: CalendarCell[] = Array.from({ length: firstDayOffset }, () => ({
    dateKey: null,
    dayNumber: null,
  }))

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day)
    cells.push({ dateKey: getLocalDateKey(date), dayNumber: day })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, dayNumber: null })
  }

  return cells
}

export function getCurrentWeekStartKey(todayKey: string) {
  const date = dateFromLocalKey(todayKey)
  const dayOfWeek = date.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  return addLocalDays(todayKey, -daysSinceMonday)
}

export function formatLocalDateKey(
  dateKey: string,
  locale: string,
  month: 'short' | 'long' = 'short',
) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month,
    weekday: 'short',
  }).format(dateFromLocalKey(dateKey))
}

export function formatLocalMonthKey(monthKey: string, locale: string) {
  const label = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(dateFromMonthKey(monthKey))

  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1)
}
