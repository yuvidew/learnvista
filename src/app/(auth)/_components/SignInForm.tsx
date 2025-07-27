"use client";

import React, { useState } from 'react';

import { AlertCircle, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Spinner from '@/components/Spinner';

const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignInForm = () => {
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        console.log("the sign up" , data);

        // TODO : Add the sign in 

    }

    const onSocial = async (provider: "google") => {
        // TODO : add social login logic 
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex size-8 items-center justify-center rounded-md">
                            <GraduationCap className='size-6' />
                        </div>
                        <span className="sr-only">LearnVista.</span>
                    </a>
                    <h1 className="text-xl font-bold">Welcome to LearnVista.</h1>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            {/* start to email input */}
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* end to email input */}

                            {/* start to password input */}
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* end to password input */}


                            {/* start to show alert */}
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <AlertCircle className=" size-4 !text-destructive" />
                                    <AlertTitle className="text-destructive">
                                        {error}
                                    </AlertTitle>
                                </Alert>
                            )}
                            {/* end to show alert */}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer"
                            >
                                {loading ? <Spinner size="sm" color="white" /> : "Sign in"}
                            </Button>
                        </div>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-background text-muted-foreground relative z-10 px-2">
                                Or
                            </span>
                        </div>
                        <Button 
                            variant="outline" 
                            type="button" 
                            className="w-full"
                            disabled={loading}
                            onClick={() => onSocial("google")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
