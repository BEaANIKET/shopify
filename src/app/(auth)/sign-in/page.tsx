"use client";
import React from "react";
import { signInSchema } from "@/schema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppContext } from "@/context";
const formSchema = signInSchema;

const Page = () => {
  const [isSignLoading, setIsSignLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { setUser, setIsAuthUser } = useAppContext()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSignLoading(true)
    try {

      const response = await axios.post("/api/sign-in", values);
      toast.success("Sign up successful!");
      setUser(response.data.user)
      setIsAuthUser(true)
      router.replace('/')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSignLoading(false)
    }
  }
  return (
    <div className="signpage flex justify-center items-center h-full min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-80px)] ">
      <div className="w-full max-w-md p-8 bg-black text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Sign In to Shopify
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-5"></div>

            {isSignLoading ? (
              <Button
                disabled
                className="bg-blue-600 relative hover:bg-blue-700 w-full"
              >
                Sign In... <Loader2 className="absolute right-3 mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full"
              >
                Sign In
              </Button>
            )}

            <Button
              type="button"
              disabled={isSignLoading}
              className="text-white w-full mt-2"
              onClick={() => router.replace("/sign-up")}
              variant="link"
            >
              Don t have an account?
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;