"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';

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
                    {/* OAuth Section */}
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => signIn('google', { callbackUrl: '/convert' })}
                                disabled={loading}
                            >
                                <FaGoogle className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => signIn('github', { callbackUrl: '/convert' })}
                                disabled={loading}
                            >
                                <FaGithub className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
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