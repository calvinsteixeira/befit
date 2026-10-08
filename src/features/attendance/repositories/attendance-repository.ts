import type { AttendanceDateRange, AttendanceRecord } from '../types/attendance'

export interface AttendanceRepository {
  listByDateRange(userId: string, range: AttendanceDateRange): Promise<AttendanceRecord[]>
  get(userId: string, attendedOn: string): Promise<AttendanceRecord | null>
  confirm(userId: string, attendedOn: string): Promise<AttendanceRecord>
  remove(userId: string, attendedOn: string): Promise<void>
}
