function padDatePart(value: number) {
  return value.toString().padStart(2, '0')
}

function dateFromLocalKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getLocalDateKey(date: Date = new Date()) {
  return [date.getFullYear(), padDatePart(date.getMonth() + 1), padDatePart(date.getDate())].join('-')
}

export function addLocalDays(dateKey: string, amount: number) {
  const date = dateFromLocalKey(dateKey)
  date.setDate(date.getDate() + amount)
  return getLocalDateKey(date)
}

export function getRecentDateKeys(todayKey: string, numberOfDays = 7) {
  return Array.from({ length: numberOfDays }, (_, index) =>
    addLocalDays(todayKey, index - (numberOfDays - 1)),
  )
}

export function getCurrentWeekStartKey(todayKey: string) {
  const date = dateFromLocalKey(todayKey)
  const dayOfWeek = date.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  return addLocalDays(todayKey, -daysSinceMonday)
}

export function formatLocalDateKey(dateKey: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  }).format(dateFromLocalKey(dateKey))
}
