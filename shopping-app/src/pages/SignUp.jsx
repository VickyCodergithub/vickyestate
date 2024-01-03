/** @format */

import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange=(e)=>{
   setData({
  ...data, 
  [e.target.id]: e.target.value,
})
  }
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const formData = await res.json();
      console.log(formData);
      if (formData.success === false) {
        setLoading(false)
        setError(formData.message);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message);
    }
   
  };

  return (
    <div className='max-w-lg mx-auto flex flex-col min-h-screen mt-9 p-3'>
    <h1 className='text-3xl text-center font-bold m-7'>SignUp
    </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type='text' placeholder='input username' onChange={handleChange} className='rounded-lg border p-2  ' id='username' />
      <input type='text' placeholder='input your email address' onChange={handleChange} className='rounded-lg border p-2' id='email' />
      <input type='text' placeholder='input password' onChange={handleChange} className='rounded-lg border p-2 ' id='password' />
      <button disabled={loading} className='bg-green-600 rounded-lg disabled:opacity-80 hover:opacity-88 uppercase hover:opacity-90 font-semibold p-1 text-white '>{loading ? 'Loading...' : 'Sign up'}</button>
    <OAuth/>
      </form>
    <div className='mt-3 flex gap-3'>
      <p>
        Have an account?
      </p>
      <Link to={"/sign-in"}>
        <span className='text-blue-400'>Sign in</span>
      </Link>
    </div>
    {error && <p className='text-red-400 mt-4' >{error}</p>}
  </div>
  );
}

export default SignUp;
