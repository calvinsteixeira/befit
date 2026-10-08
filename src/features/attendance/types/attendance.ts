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

export interface AttendanceSummary {
  currentStreak: number
  currentMonthCount: number
}

export interface AttendanceMonth {
  monthKey: string
  records: AttendanceRecord[]
}
