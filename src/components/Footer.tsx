"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Simple Todo App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 