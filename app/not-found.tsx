import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4'>
            <div className='text-center max-w-md'>
                <h1 className='text-6xl font-bold text-gray-900 mb-2'>404</h1>
                <h2 className='text-2xl font-medium text-gray-700'>Page Not Found</h2>
                <p className='text-gray-500 mb-8'>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className='space-y-3'>
                    <Link href="/">
                        <Button className='w-full'> Go To HomePage</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" className='w-full'> Go To Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}