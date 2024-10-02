"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { addProductSchema } from "@/schema/addProductSchema";
import { useAppContext } from "@/context";
import { updateNewProduct } from "@/services/product";
import toast from "react-hot-toast";

const InputSchema = addProductSchema;

export default function Page() {
  const [file, setFile] = useState(null);
  const [isSignLoading, setIsSignLoading] = useState(false);
  const { currUpdateProductDetails, setCurrUpdateProductDetails } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const form = useForm({
    resolver: zodResolver(InputSchema),
    defaultValues: currUpdateProductDetails,
  });

  const onSubmit = async (values) => {
    setIsSignLoading(true);

    const updatedValues = { ...values, file };

    const response = await updateNewProduct(updatedValues, id);
    setIsSignLoading(false);

    if (response && response.success) {
      form.reset();
      setFile(null);
      toast.success("Product updated successfully!");
      router.replace("/admin-view");
    } else {
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="mt-[10px] flex justify-center">
      <div className="grid w-full max-w-[1500px] p-8 items-center gap-1.5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <Input
              id="picture"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Item name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {["men", "women", "kid"].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={category}
                            checked={field.value.includes(category)}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked
                                  ? [...field.value, category]
                                  : field.value.filter((val) => val !== category)
                              )
                            }
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Size */}
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
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked
                                  ? [...field.value, size]
                                  : field.value.filter((val) => val !== size)
                              )
                            }
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

            {/* On Sale */}
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
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Drop */}
            <FormField
              control={form.control}
              name="priceDrop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Drop</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Discounted price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={isSignLoading}
              type="submit"
              className="w-full mt-4"
            >
              {isSignLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
