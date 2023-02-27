import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, {
      message: 'Name must have at least 3 characters',
    }),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required',
    })
    .email({
      message: 'Email must be a valid email',
    }),
  phone: z
    .string({
      invalid_type_error: 'Phone must be a string',
      required_error: 'Phone is required',
    })
    .regex(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, {
      message: 'Phone must be a valid phone number',
    }),
  address: z
    .string({
      invalid_type_error: 'Address must be a string',
      required_error: 'Address is required',
    })
    .min(5, {
      message: 'Address must have at least 5 characters',
    }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'CPF must be a valid CPF',
  }),
});

export type IUser = z.infer<typeof UserSchema>;
