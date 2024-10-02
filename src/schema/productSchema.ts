import * as z from 'zod'

// Define the schema for the input fields
export const productSchema = z.object({
    size: z.array(z.enum(["S", "M", "L"]), {
        errorMap: () => ({ message: "Size must be one of 'S', 'M', or 'L'" }),
    }).nonempty({ message: "At least one size must be selected" }),
    name: z.string().nonempty({ message: "Name cannot be empty" }),
    price: z
        .string()
        .nonempty({ message: "Price cannot be empty" })
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),
    description: z.string().nonempty({ message: "Description cannot be empty" }),
    category: z.array(z.string(), {
        errorMap: () => ({ message: "Category must be selected" }),
    }).nonempty({ message: "At least one category must be selected" }),
    deliveryInfo: z
        .string()
        .nonempty({ message: "Delivery info cannot be empty" }),
    onSale: z.enum(["Yes", "No"], {
        errorMap: () => ({ message: "On Sale must be either 'Yes' or 'No'" }),
    }),
    priceDrop: z
        .number()
        .min(0, { message: "Minimum price drop is 0" }),
    imageUrl: z
        .string()
        .nonempty({ message: "Image URL cannot be empty" })
});
