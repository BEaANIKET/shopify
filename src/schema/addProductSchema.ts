import * as z from 'zod';

// Define the schema for the input fields
export const addProductSchema = z.object({
  size: z.array(z.enum(["S", "M", "L"], {
    errorMap: () => ({ message: "Size must be one or more of 'S', 'M', or 'L'" }),
  })).min(1, { message: "At least one size must be selected" }),
  
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  
  price: z
    .string()
    .nonempty({ message: "Price cannot be empty" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),
  
  description: z.string().nonempty({ message: "Description cannot be empty" }),
  
  category: z.array(z.enum(["men", "women", "kid"], {
    errorMap: () => ({ message: "Category must be one or more of 'male', 'female', or 'kid'" }),
  })).min(1, { message: "At least one category must be selected" }),
  
  deliveryInfo: z.string().nonempty({ message: "Delivery info cannot be empty" }),
  
  onSale: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "OnSale must be either 'Yes' or 'No'" }),
  }),
  
  priceDrop: z
    .string()
    .nonempty({ message: "Price drop cannot be empty" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price drop must be a valid number" })
    .refine(value => parseFloat(value) >= 0, { message: "Price drop must be a non-negative number" }),
});
