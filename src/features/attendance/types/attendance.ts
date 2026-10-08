export interface AttendanceRecord {
  id: string
  userId: string
  attendedOn: string
  createdAt: string
}

export interface AttendanceDateRange {
  from: string
  to: string
}

export interface AttendanceDay {
  dateKey: string
  record: AttendanceRecord | null
}

export interface AttendanceSummary {
  today: AttendanceRecord | null
  currentStreak: number
  currentWeekCount: number
  recentDays: AttendanceDay[]
}
