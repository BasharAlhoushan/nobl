import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const StorefrontLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-nubl-obsidian text-nubl-ivory antialiased selection:bg-nubl-gold selection:text-nubl-obsidian">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
