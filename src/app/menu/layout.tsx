import React from 'react';
import { Header } from '../_components/qala/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Header/>
        <div className='flex flex-col items-center min-h-screen pt-10'>
            <div>{children}</div>
        </div>
    </>
  )
}
