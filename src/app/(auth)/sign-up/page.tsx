"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/signUpSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Define your form with the schema
const formSchema = signUpSchema;

export default function SignIn() {
  // Define your form

  const [isSignLoading, setIsSignLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Client",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSignLoading(true)
    try {

      const response = await axios.post("/api/sign-up", values);
      toast.success("Sign up successful!");
      router.replace('/sign-in')
    } catch (error) {
      (error)
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSignLoading(false)
    }
  }
  return (
    <div className="signpage flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-black text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 w-full text-center">
          Sign Up to Shopify
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your first name as it appears on official documents.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your last name as it appears on official documents.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We ll use this email to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your password should be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          checked={field.value === "Admin"}
                          onChange={() => field.onChange("Admin")}
                          className="text-black"
                        />
                        <span>Admin</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          checked={field.value === "Client"}
                          onChange={() => field.onChange("Client")}
                          className="text-black"
                        />
                        <span>Client</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              isSignLoading ? (
                <Button
                  type="submit"
                  className="bg-blue-600 relative hover:bg-blue-700 w-full"
                >
                  Sign Up... <Loader2 className=" absolute right-3 mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                Sign Up
              </Button>
            }

            <Button
              disabled={isSignLoading}
              className="text-white w-full"
              onClick={() => router.replace("/sign-in")}
              variant="link"
            >
              Already have an account?
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
