import { z } from 'zod';

export const postSchema = z.object({
  platform: z.enum(['linkedin', 'threads'], {
    required_error: 'Please select a platform',
  }),
  content_text: z
    .string()
    .min(1, 'Content is required')
    .max(3000, 'Content must be less than 3000 characters'),
  media_type: z.enum(['text', 'image', 'video']).default('text'),
  media_path: z.string().optional().nullable(),
  scheduled_at: z.string().min(1, 'Scheduled time is required'),
  timezone: z.string().default('Asia/Jakarta'),
});

export const autoReplyRuleSchema = z.object({
  platform: z.enum(['linkedin', 'threads'], {
    required_error: 'Please select a platform',
  }),
  keyword: z
    .string()
    .min(1, 'Keyword is required')
    .max(100, 'Keyword must be less than 100 characters'),
  reply_template: z
    .string()
    .min(1, 'Reply template is required')
    .max(1000, 'Reply template must be less than 1000 characters'),
  is_active: z.boolean().default(true),
});

export const profileSchema = z.object({
  display_name: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters'),
  avatar_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  timezone: z.string().min(1, 'Timezone is required'),
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type PostFormData = z.infer<typeof postSchema>;
export type AutoReplyRuleFormData = z.infer<typeof autoReplyRuleSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;