"use client";

import React, { useState, useCallback, Suspense, useEffect } from "react";
import * as z from "zod";
import ApiLogin from "../../api/auth/apilogin";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./components/ui/form";

import Image from 'next/image';
import Logo from '../../public/images/TLE_Logo.png';

const Button = React.lazy(() => import("./components/ui/button").then(module => ({ default: module.Button })));
const Input = React.lazy(() => import("./components/ui/input").then(module => ({ default: module.Input })));

// Form validation schema
const signInSchema = z.object({
  email: z.string().email("Email should be valid").min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

// Define the form data type
type SignInFormData = z.infer<typeof signInSchema>;

const Page: React.FC = () => {
  const router = useRouter();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const data = await ApiLogin.login(values.email, values.password);

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);

        // console.log("Redirecting to home...");
        router.push("/home");
      } else {
        setErrorMessage(data.msg || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    React.startTransition(() => {
      import("./components/ui/button");
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      {/* Ensure background is below form */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="animated-background" />
      </div>

      <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden max-w-xl w-full p-8">
        <div className="text-center mb-8">
          <Image src={Logo} alt="TrueLight Energy Logo" className="mx-auto mb-4" priority={true} />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}

        <Suspense fallback={<div>Loading form...</div>}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Suspense fallback={<div>Loading email input...</div>}>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Email here"
                          type="text"
                          className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          {...field}
                          aria-label="Email input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </Suspense>

              <Suspense fallback={<div>Loading password input...</div>}>
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          {...field}
                          aria-label="Password input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </Suspense>

              <Suspense fallback={<div>Loading button...</div>}>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Button>
              </Suspense>
            </form>
          </Form>
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(Page);
