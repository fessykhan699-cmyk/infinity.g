
import React, { ReactNode } from 'react';
import DynamicBackgroundVideo from '../components/DynamicBackgroundVideo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <DynamicBackgroundVideo />
      
      <Navbar />
      
      <main className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
