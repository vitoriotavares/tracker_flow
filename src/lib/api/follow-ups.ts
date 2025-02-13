import { supabase } from '../supabase';
import type { FollowUp, Priority } from '@/types/schema';

export const followUpApi = {
  async list(filters?: {
    status?: 'pending' | 'completed';
    priority?: Priority;
    assignedTo?: string;
  }) {
    let query = supabase
      .from('follow_ups')
      .select(`
        *,
        conversation:conversations(
          id,
          subject,
          customer:customers(
            name,
            email
          )
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters?.assignedTo) {
      query = query.eq('assigned_to', filters.assignedTo);
    }

    const { data, error } = await query
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(followUp: Omit<FollowUp, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('follow_ups')
      .insert(followUp)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<FollowUp>) {
    const { data, error } = await supabase
      .from('follow_ups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('follow_ups')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getUpcoming(days: number = 7) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const { data, error } = await supabase
      .from('follow_ups')
      .select(`
        *,
        conversation:conversations(
          subject,
          customer:customers(name)
        )
      `)
      .eq('status', 'pending')
      .lte('due_date', endDate.toISOString())
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  }
};
