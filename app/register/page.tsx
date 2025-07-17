"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { set } from 'mongoose';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            // react-query
            // loading, error, debounce
            const response = await fetch('api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            toast.success("Registration successful");
            // Redirect to login or home page
            setTimeout(() =>
                router.push('/login'), 500);


        } catch (error: any) {
            console.error("Registration failed:", error);
            return;

        } finally {
            setLoading(false);
        }

    };


    return (
        <div className='flex justify-center items-center min-h-screen p-4 bg-gray-50'>
            {/* Registration form or content goes here */}
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-2xl text-center'>Create an Account</CardTitle>
                    <CardDescription className='text-center text-sm text-muted-foreground'>
                        Register to access all features
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email
                            </label>
                            <div className='relative'>
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
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                    required
                                />

                                <Button
                                    type='button'
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </Button>
                            </div>


                            <p className='text-sm text-red-500'> Password must be at least 6 characters</p>
                        </div>
                        <Button
                            type='submit'
                            disabled={!email || !password || !name || loading}
                            className='w-full mt-4'
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-muted-foreground'>Already have an account?{' '}
                        <Link href='/login' className='text-blue-600 hover:underline'>
                            Login
                        </Link>
                    </p>
                    
                </CardFooter>
            </Card>

        </div>
    )
}

export default RegisterPage