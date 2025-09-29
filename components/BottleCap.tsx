import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface BottleCapProps {
  text: string;
  isFlipping: boolean;
  isLoading: boolean;
}

const BottleCap: React.FC<BottleCapProps> = ({ text, isFlipping, isLoading }) => {
  return (
    // Perspective container for 3D effect
    <div className="[perspective:1000px] w-64 h-64 sm:w-80 sm:h-80">
      {/* The flipper element that rotates */}
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipping ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of the cap (Logo) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center bg-green-600 rounded-full shadow-2xl border-8 border-gray-300">
           <img src="https://i.imgur.com/rG7G0yY.png" alt="Logo Tymbark" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
        </div>
        
        {/* Back of the cap (Text) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 bg-gray-200 rounded-full shadow-inner flex items-center justify-center p-4 border-8 border-gray-300">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <p className="text-center text-xl sm:text-2xl font-bold text-gray-800 -rotate-6 transform">
                    {text}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default BottleCap;
