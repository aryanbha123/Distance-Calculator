import React from 'react';
import image from './image.png';

export default function Nav() {
    return (
        <div className="flex justify-between items-center w-full max-w-7xl mt-2 px-6 py-4 relative z-50 bg-gradient-to-r from-blue-500 to-blue-700 text-[#111= shadow-lg font-sans rounded-b-2xl">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <img 
                    src={image} 
                    alt="Logo" 
                    className="w-36 rounded-full object-contain" 
                />
                <span className="text-sm italic text-gray-200 mt-2">
                    Discover and plan your next adventure
                </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-8">
                <h1 className="text-lg font-semibold text-gray-100">
                    Welcome, User
                </h1>
                <div className="flex items-center gap-6">
                    <a className="italic text-sm text-indigo-300 hover:text-indigo-500 transition-colors duration-300" href="">
                        Download Dataset
                    </a>
                    <a className="italic text-sm text-indigo-300 hover:text-indigo-500 transition-colors duration-300" href="">
                        View Project Info
                    </a>
                </div>
            </div>
        </div>
    );
}
