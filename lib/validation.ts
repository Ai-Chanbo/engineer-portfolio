import { z } from "zod";

/**
 * Contact form schema — shared by the client form and the API route so
 * validation stays in sync. The honeypot field is handled separately.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(100, "100文字以内で入力してください"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください")
    .max(200),
  company: z.string().trim().max(100, "100文字以内で入力してください").optional(),
  message: z
    .string()
    .trim()
    .min(10, "10文字以上で入力してください")
    .max(2000, "2000文字以内で入力してください"),
});

export type ContactInput = z.infer<typeof contactSchema>;
