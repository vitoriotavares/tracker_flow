import { supabase } from '../supabase';
import type { Conversation, Priority, ConversationStatus, Message, ConversationFile } from '@/types/schema';

export const conversationApi = {
  async list(filters?: {
    status?: ConversationStatus;
    priority?: Priority;
    customerId?: string;
  }) {
    let query = supabase
      .from('conversations')
      .select(`
        *,
        customer:customers(name, email),
        files:files(count),
        messages:messages(count)
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }

    const { data, error } = await query.order('updated_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        customer:customers(*),
        files:files(*),
        messages:messages(*),
        follow_ups:follow_ups(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(conversation: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversation)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Conversation>) {
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadFile(conversationId: string, file: File): Promise<ConversationFile> {
    const filename = `${conversationId}/${Date.now()}-${file.name}`;
    
    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('conversation-files')
      .upload(filename, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('conversation-files')
      .getPublicUrl(filename);

    // Create file record
    const { data: fileRecord, error: fileError } = await supabase
      .from('files')
      .insert({
        conversation_id: conversationId,
        filename: file.name,
        file_type: file.type,
        size: file.size,
        url: publicUrl,
      })
      .select()
      .single();

    if (fileError) throw fileError;
    return fileRecord;
  }
};
