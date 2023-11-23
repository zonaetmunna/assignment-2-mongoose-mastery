import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string().min(1).max(50),
  password: z.string().min(6).max(20),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  orders: z.array(orderSchema),
});

export default userValidationSchema;
