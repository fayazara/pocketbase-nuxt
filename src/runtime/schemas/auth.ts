import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
})

export const registerUserSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Passwords dont match',
    path: ['passwordConfirm'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
})
