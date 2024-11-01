"use client";
import React from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name should have at least 2 characters.")
      .max(50, "Name should not exceed 50 characters.")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Name should only contain alphabets."
      ),
    email: z.string().email("Email should be valid"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Page = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="bg-indigo-600 text-white p-8 md:w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to TrueLight</h2>
            <p className="text-indigo-200 mb-6 text-center">
              Already have an account?
            </p>
            <Link href="/signin">
              <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="p-8 md:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Register Here
            </h3>
            <div className="mb-6 flex justify-center space-x-4">
              {["google", "facebook", "github"].map((provider) => (
                <Button
                  key={provider}
                  variant="outline"
                  className="rounded-full p-2 hover:bg-gray-100 transition-all duration-300"
                >
                  {provider === "google" && (
                    <FaGoogle className="h-5 w-5 text-red-500" />
                  )}
                  {provider === "facebook" && (
                    <FaFacebook className="h-5 w-5 text-blue-600" />
                  )}
                  {provider === "github" && (
                    <FaGithub className="h-5 w-5 text-gray-800" />
                  )}
                </Button>
              ))}
            </div>
            <p className="text-center text-gray-600 mb-6">
              or use your email for registration
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {["name", "email", "password", "confirmPassword"].map(
                  (field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={
                        field as
                          | "name"
                          | "email"
                          | "password"
                          | "confirmPassword"
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            {field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                field.name === "name"
                                  ? "Your Name here"
                                  : field.name === "email"
                                  ? "Enter Your Email here"
                                  : "••••••••"
                              }
                              type={
                                field.name.includes("password")
                                  ? "password"
                                  : "text"
                              }
                              className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  )
                )}
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors duration-300"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
