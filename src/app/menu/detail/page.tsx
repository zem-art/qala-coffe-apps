'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DetailMenu() {
    const router = useRouter();
    return (
        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-4xl font-bold mb-4 capitalize'>welcome to detail menu</h1>
                <button onClick={() => router.push('/menu/list')} className='mt-4 px-6 py-2 bg-primary text-white rounded cursor-pointer'>
                    go back
                </button>
            </div>
        </>
    );
}
