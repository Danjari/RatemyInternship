import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat Application',
  description: 'A chat application built with Next.js',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header>
        <h1>Chat Application</h1>
        {/* Add navigation or other header content here */}
      </header>

      <main>
        {children}
      </main>

      <footer>
    
      </footer>
    </div>
  );
}
