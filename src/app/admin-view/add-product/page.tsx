"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schema/addProductSchema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { addNewProduct } from "@/services/product";

const InputSchema = addProductSchema;

export default function Page() {
  const [file, setFile] = useState(null);
  const [isSignLoading, setIsSignLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      size: [],
      name: "",
      price: "",
      description: "",
      category: [],
      deliveryInfo: "",
      onSale: "No",
      priceDrop: "0",
    },
  });

  const router = useRouter();

  const onSubmit = async (values) => {
    setIsSignLoading(true);
    const response = await addNewProduct(values, file);
    setIsSignLoading(false);
    if (response && response.success) {
      form.reset();
      setFile(null);
      // router.replace('/admin-view')
      toast.success("Product added successfully!");
    } else {
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid w-full max-w-[1500px] p-8 items-center gap-1.5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

            <Input
              id="picture"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Item Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your item name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="100.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The price of the item.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Item description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of the item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      {["men", "women", "kid"].map((cat) => (
                        <label key={cat} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={cat}
                            checked={field.value.includes(cat)}
                            onChange={() => {
                              const newCategories = field.value.includes(cat)
                                ? field.value.filter((c) => c !== cat)
                                : [...field.value, cat];
                              field.onChange(newCategories);
                            }}
                            className="text-black"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>Select one or more categories.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Info</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Delivery information"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Information about delivery options.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      {["S", "M", "L"].map((size) => (
                        <label key={size} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={size}
                            checked={field.value.includes(size)}
                            onChange={() => {
                              const newSizes = field.value.includes(size)
                                ? field.value.filter((s) => s !== size)
                                : [...field.value, size];
                              field.onChange(newSizes);
                            }}
                            className="text-black"
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="onSale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On Sale</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Yes"
                          {...field}
                          checked={field.value === "Yes"}
                          onChange={() => field.onChange("Yes")}
                          className="text-black"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="No"
                          {...field}
                          checked={field.value === "No"}
                          onChange={() => field.onChange("No")}
                          className="text-black"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceDrop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Drop</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount by which the price is reduced.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSignLoading} type="submit" className="mt-4 w-full">
              {isSignLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
