'use client';
import React from 'react';
import MainLayout from '../layout';
import { useRouter } from 'next/navigation';


export default function ListMenu() {
    const router = useRouter();
  
    return (
        <MainLayout>
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-4xl font-bold mb-4 capitalize'>Welcome to Qala Coffee Menu</h1>
                <p className='text-lg text-gray-600'>Explore our delicious offerings!</p>
                <p className='text-lg text-gray-600'></p>
                <button onClick={() => router.push('/menu/detail')} className='mt-4 px-6 py-2 bg-primary text-white rounded cursor-pointer'>
                    Detail Menu
                </button>
            </div>
        </MainLayout>
    );
}
