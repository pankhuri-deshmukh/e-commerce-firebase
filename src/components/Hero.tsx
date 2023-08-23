import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r mt-0 from-blue-500 to-purple-500 py-24 text-white mb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              <span className='italic text-[#eaa5d5]'>Welcome to <br /></span> The Store.
            </h1>
            <p className="text-lg mb-6">
              Discover the best products at amazing prices.
            </p>
            <button className="bg-[#0c0c0c] border-2 border-black text-white font-bold py-2 px-6 rounded-md hover:border-[#A456F5] hover:bg-white hover:text-[#A456F5] transition duration-300">
              SHOP NOW
            </button>
          </div>
          <div className="hidden md:block">
            {/* <img
              src=""
              alt="Hero Image"
              className="w-full h-full object-cover rounded-lg"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
