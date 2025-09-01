"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // Moved useRouter here

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error || "Invalid credentials");
            }
            else {
                toast.success("Login successful");
                // Redirect to home or dashboard
                setTimeout(() => router.push('/convert'), 500);
            }

        } catch {
            toast.error("Login failed. Please try again");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='flex justify-center items-center min-h-screen p-4 bg-gray-50'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-2xl text-center'>Welcome Back</CardTitle>
                    <CardDescription className='text-center text-sm text-muted-foreground'>
                        Login to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email
                            </label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type='submit'
                            disabled={!email || !password || loading}
                            className='w-full mt-4'
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-muted-foreground'>Don&apos;t have an account?{' '}
                        <Link href='/register' className='text-blue-600 hover:underline'>
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage;