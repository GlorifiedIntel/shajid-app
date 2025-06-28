import { z } from 'zod';

export const schemaStep6 = z.object({
  jambRegNumber: z
    .string()
    .min(8, 'JAMB Registration Number is required'),
  jambScore: z
    .number({
      required_error: 'Score is required',
      invalid_type_error: 'Score must be a number',
    })
    .min(100, 'Minimum score is 100')
    .max(400, 'Maximum score is 400'),
});