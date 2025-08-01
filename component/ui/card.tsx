import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Card() {
  return (
    <div className="w-[385px] h-[480px] p-[30px] bg-gray-300 rounded-lg shadow-md border border-gray-200 relative overflow-hidden group cursor-pointer transition-all duration-300 m-3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/image.png)' }}>
      {/* Linear gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(189deg, rgba(0, 0, 0, 0.00) 34.81%, #000 78.26%)' }}></div>
      
      {/* Overlay that slides in from bottom */}
      <div className="absolute inset-0 bg-black/60 transform translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"></div>
      
      <div className="grid grid-cols-[1fr_60px] gap-2 items-end h-full relative z-10">
        <div className="relative h-full flex flex-col justify-end overflow-hidden">
          <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-18">
            <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase pb-1 text-green-700">
              Manufacturing
            </h2>
            <h1 className="text-[20px] font-medium leading-tight text-white">
              Rapid Response cuts Business Disruption Time in Half for a Hardware Manufacturer
            </h1>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mt-4 transform translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 absolute bottom-0 left-0 right-0">
            This Resilience insurance client in the utility industry wanted to improve their third-party security.
          </p>
        </div>
        <div className="flex justify-end items-end pb-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out group-hover:w-20">
            <ChevronRight className="w-6 h-6 text-gray-600 transition-all duration-300 ease-in-out group-hover:scale-0 group-hover:opacity-0" />
            <ArrowRight className="w-6 h-6 text-gray-600 absolute transition-all duration-300 ease-in-out scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}