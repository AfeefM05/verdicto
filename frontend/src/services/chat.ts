import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Conversation = Tables<'conversations'>;
export type Message = Tables<'messages'>;

function isSchemaMissingError(err: unknown) {
  try {
    const s = typeof err === 'string' ? err : JSON.stringify(err);
    return (
      s.includes('PGRST205') ||
      s.includes("Could not find the table 'public.conversations'") ||
      s.includes("Could not find the table 'public.messages'")
    );
  } catch {
    return false;
  }
}

export async function createConversation(params: Omit<TablesInsert<'conversations'>, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert(params)
      .select('*')
      .single();
    if (error) throw error;
    return data as Conversation;
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function updateConversation(id: string, updates: Partial<Conversation>) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Conversation;
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function listConversations(userId: string) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('is_starred', { ascending: false })
      .order('last_message_at', { ascending: false, nullsFirst: false });
    if (error) throw error;
    return (data || []) as Conversation[];
  } catch (e) {
    if (isSchemaMissingError(e)) return [];
    throw e;
  }
}

export async function getConversationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Conversation;
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function addMessage(params: TablesInsert<'messages'>) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert(params)
      .select('*')
      .single();
    if (error) throw error;
    return data as Message;
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function getMessages(conversationId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []) as Message[];
  } catch (e) {
    if (isSchemaMissingError(e)) return [];
    throw e;
  }
}

export async function toggleStar(conversationId: string, isStarred: boolean) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .update({ is_starred: isStarred })
      .eq('id', conversationId)
      .select('*')
      .single();
    if (error) throw error;
    return data as Conversation;
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function deleteConversation(conversationId: string) {
  try {
    // Delete dependent messages first to satisfy FK constraints when CASCADE isn't configured
    const deleteMessages = supabase
      .from('messages')
      .delete({ count: 'exact' })
      .eq('conversation_id', conversationId);
    const { error: msgErr } = await deleteMessages;
    if (msgErr) throw msgErr;

    const deleteConversation = supabase
      .from('conversations')
      .delete({ count: 'exact' })
      .eq('id', conversationId);
    const { error: convErr, count } = await deleteConversation;
    if (convErr) throw convErr;
    if (!count || count === 0) {
      throw new Error('NOT_FOUND_OR_FORBIDDEN');
    }
  } catch (e) {
    if (isSchemaMissingError(e)) throw new Error('SCHEMA_MISSING');
    throw e;
  }
}

export async function findDraftConversation(userId: string) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .or('last_message.is.null,last_message.eq.')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error && error.code !== 'PGRST116') throw error;
    return (data || null) as Conversation | null;
  } catch (e) {
    if (isSchemaMissingError(e)) return null;
    throw e;
  }
}

export function snippet(text: string, max = 80) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + '…';
}

export function notifyConversationsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('conversations:updated'));
  }
}

