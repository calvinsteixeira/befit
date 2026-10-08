import type { AttendanceDateRange, AttendanceRecord } from '../types/attendance'

export interface AttendanceRepository {
  listByDateRange(userId: string, range: AttendanceDateRange): Promise<AttendanceRecord[]>
  getToday(userId: string, attendedOn: string): Promise<AttendanceRecord | null>
  confirmToday(userId: string, attendedOn: string): Promise<AttendanceRecord>
  removeToday(userId: string, attendedOn: string): Promise<void>
}
