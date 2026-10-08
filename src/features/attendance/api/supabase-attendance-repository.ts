import { supabase } from '@/lib/supabase/client'

import type { AttendanceRepository } from '../repositories/attendance-repository'
import type { AttendanceDateRange, AttendanceRecord } from '../types/attendance'

interface AttendanceRow {
  id: string
  user_id: string
  attended_on: string
  created_at: string
}

const TABLE = 'attendance_records'
const COLUMNS = 'id, user_id, attended_on, created_at'

function toDomainRecord(row: AttendanceRow): AttendanceRecord {
  return {
    id: row.id,
    userId: row.user_id,
    attendedOn: row.attended_on,
    createdAt: row.created_at,
  }
}

export const supabaseAttendanceRepository: AttendanceRepository = {
  async listByDateRange(userId: string, range: AttendanceDateRange) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(COLUMNS)
      .eq('user_id', userId)
      .gte('attended_on', range.from)
      .lte('attended_on', range.to)
      .order('attended_on', { ascending: false })

    if (error) {
      throw error
    }

    return (data as AttendanceRow[]).map(toDomainRecord)
  },

  async getToday(userId: string, attendedOn: string) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(COLUMNS)
      .eq('user_id', userId)
      .eq('attended_on', attendedOn)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data ? toDomainRecord(data as AttendanceRow) : null
  },

  async confirmToday(userId: string, attendedOn: string) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ user_id: userId, attended_on: attendedOn })
      .select(COLUMNS)
      .single()

    if (error?.code === '23505') {
      const existing = await this.getToday(userId, attendedOn)

      if (existing) {
        return existing
      }
    }

    if (error) {
      throw error
    }

    return toDomainRecord(data as AttendanceRow)
  },

  async removeToday(userId: string, attendedOn: string) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('user_id', userId)
      .eq('attended_on', attendedOn)

    if (error) {
      throw error
    }
  },
}
