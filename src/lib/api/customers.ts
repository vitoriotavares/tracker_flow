import { supabase } from '../supabase';
import type { Customer } from '@/types/schema';

export const customerApi = {
  async list(search?: string) {
    let query = supabase
      .from('customers')
      .select(`
        *,
        conversations:conversations(count)
      `);

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data, error } = await query.order('name');
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        conversations:conversations(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCustomerStats(id: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        id,
        priority,
        status,
        created_at
      `)
      .eq('customer_id', id);

    if (error) throw error;

    return {
      totalConversations: data.length,
      byPriority: data.reduce((acc, conv) => {
        acc[conv.priority] = (acc[conv.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byStatus: data.reduce((acc, conv) => {
        acc[conv.status] = (acc[conv.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
};
