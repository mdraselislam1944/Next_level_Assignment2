import { z } from "zod";

export const userInformationSchemaValidation = z.object({
  userId: z.number().refine(value => typeof value === "number", {
    message: "User ID must be a number",
  }),
  username: z.string().refine(value => value.trim() !== "", {
    message: "Username is required",
  }),
  password: z.string().refine(value => value.trim() !== "", {
    message: "Password is required",
  }),
  fullName: z.object({
    firstName: z.string().refine(value => value.trim() !== "", {
      message: "First name is required",
    }),
    lastName: z.string().refine(value => value.trim() !== "", {
      message: "Last name is required",
    }),
  }),
  age: z.number().refine(value => value >= 0, {
    message: "Age must be a non-negative number",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).refine(value => value.length > 0, {
    message: "At least one hobby is required",
  }),
  address: z.object({
    street: z.string().refine(value => value.trim() !== "", {
      message: "Street is required",
    }),
    city: z.string().refine(value => value.trim() !== "", {
      message: "City is required",
    }),
    country: z.string().refine(value => value.trim() !== "", {
      message: "Country is required",
    }),
  }),
  orders: z.array(
    z.object({
      productName: z.string().refine(value => value.trim() !== "", {
        message: "Product name is required",
      }),
      price: z.number().refine(value => value >= 0, {
        message: "Price must be a non-negative number",
      }),
      quantity: z.number().refine(value => value >= 0, {
        message: "Quantity must be a non-negative number",
      }),
    })
  ),
});

export default userInformationSchemaValidation;
