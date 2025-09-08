import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AutoReplyRule {
  id: string;
  user_id: string;
  platform: 'linkedin' | 'threads';
  keyword: string;
  reply_template: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateAutoReplyRuleData = Pick<AutoReplyRule, 'platform' | 'keyword' | 'reply_template' | 'is_active'>;
export type UpdateAutoReplyRuleData = Partial<Pick<AutoReplyRule, 'keyword' | 'reply_template' | 'is_active'>>;

export function useAutoReplyRules() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: rules = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['auto-reply-rules', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('auto_reply_rules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AutoReplyRule[];
    },
    enabled: !!user?.id,
  });

  const createRule = useMutation({
    mutationFn: async (ruleData: CreateAutoReplyRuleData) => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('auto_reply_rules')
        .insert([{ ...ruleData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-rules', user?.id] });
    },
  });

  const updateRule = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & UpdateAutoReplyRuleData) => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('auto_reply_rules')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-rules', user?.id] });
    },
  });

  const deleteRule = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('auto_reply_rules')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-reply-rules', user?.id] });
    },
  });

  return {
    rules,
    isLoading,
    error,
    createRule,
    updateRule,
    deleteRule,
  };
}