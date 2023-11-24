"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(20),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const orderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string().min(1).max(50),
    password: zod_1.z.string().min(6).max(20),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1)),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderSchema),
});
exports.default = exports.userValidationSchema;
