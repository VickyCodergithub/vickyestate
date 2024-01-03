/** @format */

import React from 'react';
import { FaFacebook, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom'


const About = () => {
  return (
    <div className='flex flex-col  min-h-screen flex-wrap
    p-20 px-3 gap-6 '>
      <h1 className='text-3xl font-bold text-center text-slate-700'>About Vicky Estate</h1>
      <p className='text-slate-700'>Vicky Estate is a real estate agency that is
        specialized in assisting their clients to buy,
        sell and rent properties in the most desirable
        areas of their choice. Our team is team is
        working tirelessly to ensure that buying
        and selling of properties is as easy as possible.
      </p>
      <p className='text-slate-700'>
        Our aim is to help our clients achieve
        their real estate goals by providing them with
        expert advice and also personalized services.
      </p>
      <p className='text-slate-700'>
        Our agents has a advanced experience and
        knowledge in the real estate industry,
        and are committed to provide high quality service to our clients.
      </p>
      <p className='text-slate-700'>
         We are set to make
        real estate an exciting and rewarding experience.
      </p>
      <div className='mt-7'>
        <h3 className='text-xl border w-fit p-2 rounded-md
      bg-slate-600 text-white font-semibold flex
      flex-wrap gap-2 items-center mb-4'>
        Contact Info
        <FaPhone />
      </h3>
      <div className='flex flex-wrap gap-6'>
        
        <p className='flex gap-1 text-xl items-center'>
          <FaFacebook className='text-blue-500 '/>
          <Link className='text-blue-900 hover:underline' to={'https://www.facebook.com/okonkwo.victor.140?mibextid=ZbWKwL'}>
            Vicky Estate
          </Link>
          
        </p>
        <p className='flex gap-1 text-xl items-center'>
          <FaWhatsapp className='text-white rounded-md
           bg-green-600'
            />
            <Link
              to={'https://api.whatsapp.com/send/?phone=%2B2348064886430&text&type=phone_number&app_absent=0'}
              className='text-blue-900 hover:underline'>
              +2348064886430
            </Link>
        </p>
        <p className='flex gap-1 text-xl items-center'>
          <FaTwitter className='text-red-600' />
            <Link className='text-blue-900 hover:underline'
              to={'https://twitter.com/Vicky23007?t=mO-BVTb9VpB_QtzGOUI8MA&s=09'}>
            Vicky23007
          </Link>
        </p>
      </div>  
      </div>
      
    </div>
  );
};

export default About;
