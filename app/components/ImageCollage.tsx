'use client';

import React from 'react';

export default function ImageCollage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Image Collage Demo
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          This is a placeholder for the Image Collage component.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}