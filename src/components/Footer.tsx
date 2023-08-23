import React from 'react';
import { FaGithub, FaTwitch, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full bg-black text-gray-300 py-2 px-24'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b-2 border-black py-8'>
        <div className='mb-6 md:mb-0'>
          <h6 className='font-bold uppercase pt-2'>The Store.</h6>
          <ul>
            <li className='py-1'>About</li>
            <li className='py-1'>Contact</li>
            <li className='py-1'>Resources</li>
          </ul>
        </div>

        <div className='mb-6 md:mb-0'>
          <h6 className='font-bold uppercase pt-2'>Our Service</h6>
          <ul>
            <li className='py-1'>How it Works</li>
            <li className='py-1'>Privacy Policy</li>
            <li className='py-1'>Terms and Conditions</li>
          </ul>
        </div>
        
        <div className='mb-6 md:mb-0'>
          <h6 className='font-bold uppercase pt-2'>Your Account</h6>
          <ul>
            <li className='py-1'>Get in Touch</li>
            <li className='py-1'>Your Orders</li>
            <li className='py-1'>Return Policy</li>
          </ul>
        </div>

        <div className='mb-6 md:mb-0'>
          <h6 className='font-bold uppercase pt-2'>Your Socials</h6>
          <ul>
            <li className='py-1'>Facebook</li>
            <li className='py-1'>Twitter</li>
            <li className='py-1'>Instagram</li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col max-w-screen-xl mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>2023 The Store. </p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
          <FaTwitch />
          <FaPinterestP />
          <FaLinkedinIn />
          <FaGithub />
        </div>
      </div>
    </div>
  );
};

export default Footer;
