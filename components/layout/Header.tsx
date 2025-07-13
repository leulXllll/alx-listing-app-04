// components/layout/Header.tsx
import React from 'react';


const Header = () => {
  const accommodationTypes = [
    "Rooms", "Mansions", "Countryside", "Beachfront", 
    "Cabins", "Luxury", "Tiny homes", "Treehouses"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-8 w-8 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800">StayEase</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 mx-8">
            <input
              type="text"
              placeholder="Search destinations, properties..."
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <button className="absolute right-2 bg-rose-500 text-white p-1 rounded-full">
              
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-block px-4 py-2 text-gray-600 hover:text-gray-900">
              Sign In
            </button>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Accommodation Types Navigation */}
        <nav className="flex overflow-x-auto py-3 hide-scrollbar">
          {accommodationTypes.map((type) => (
            <button
              key={type}
              className="px-4 py-2 whitespace-nowrap text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition mx-1"
            >
              {type}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Search (hidden on desktop) */}
      <div className="md:hidden bg-white py-3 px-4 border-t">
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <button className="absolute right-2 bg-rose-500 text-white p-1 rounded-full">
           
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};

export default Header;