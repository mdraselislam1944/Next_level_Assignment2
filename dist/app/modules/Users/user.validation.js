"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInformationSchemaValidation = void 0;
const zod_1 = require("zod");
exports.userInformationSchemaValidation = zod_1.z.object({
    userId: zod_1.z.number().refine(value => typeof value === "number", {
        message: "User ID must be a number",
    }),
    username: zod_1.z.string().refine(value => value.trim() !== "", {
        message: "Username is required",
    }),
    password: zod_1.z.string().refine(value => value.trim() !== "", {
        message: "Password is required",
    }),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "First name is required",
        }),
        lastName: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "Last name is required",
        }),
    }),
    age: zod_1.z.number().refine(value => value >= 0, {
        message: "Age must be a non-negative number",
    }),
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()).refine(value => value.length > 0, {
        message: "At least one hobby is required",
    }),
    address: zod_1.z.object({
        street: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "Street is required",
        }),
        city: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "City is required",
        }),
        country: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "Country is required",
        }),
    }),
    orders: zod_1.z.array(zod_1.z.object({
        productName: zod_1.z.string().refine(value => value.trim() !== "", {
            message: "Product name is required",
        }),
        price: zod_1.z.number().refine(value => value >= 0, {
            message: "Price must be a non-negative number",
        }),
        quantity: zod_1.z.number().refine(value => value >= 0, {
            message: "Quantity must be a non-negative number",
        }),
    })),
});
exports.default = exports.userInformationSchemaValidation;
