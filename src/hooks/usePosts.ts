import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Post {
  id: string;
  user_id: string;
  platform: 'linkedin' | 'threads';
  content_text: string;
  media_type: 'text' | 'image' | 'video';
  media_path: string | null;
  scheduled_at: string;
  timezone: string;
  status: 'draft' | 'queued' | 'posted' | 'failed' | 'cancelled';
  external_id: string | null;
  permalink: string | null;
  response_json: any;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export type CreatePostData = Pick<Post, 'platform' | 'content_text' | 'media_type' | 'media_path' | 'scheduled_at' | 'timezone'>;
export type UpdatePostData = Partial<Pick<Post, 'content_text' | 'media_type' | 'media_path' | 'scheduled_at' | 'timezone' | 'status'>>;

export function usePosts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
    enabled: !!user?.id,
  });

  const createPost = useMutation({
    mutationFn: async (postData: CreatePostData) => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...postData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user?.id] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & UpdatePostData) => {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user?.id] });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user?.id] });
    },
  });

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
}