/** @format */
import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import  {startSignIn, successInSignIn, failureInSignIn} from '../toolkit/user/userSlice.js'
import OAuth from '../components/OAuth.jsx';

const SignIn = () => {
  const [data, setData] = useState({});
const {error, loading}= useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange=(e)=>{
   setData({
  ...data, 
  [e.target.id]: e.target.value,
})
  }
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      dispatch(startSignIn());
      const res = await fetch('/api/auth/signin', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const formData = await res.json();
      console.log(formData);
      if (formData.success === false) {
        dispatch(failureInSignIn(formData.message));
        return;
      }
      dispatch(successInSignIn(formData))
      navigate('/')
    } catch (error) {
     dispatch(failureInSignIn(error.message));
    }
   
  };

  return (
    <div className='max-w-lg mx-auto flex flex-col min-h-screen mt-9 p-3'>
    <h1 className='text-3xl text-center font-bold m-7'>SignIn
    </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type='text' placeholder='input your email address' onChange={handleChange} className='rounded-lg border p-2' id='email' />
      <input type='text' placeholder='input password' onChange={handleChange} className='rounded-lg border p-2 ' id='password' />
      <button disabled={loading} className='bg-green-600 rounded-lg disabled:opacity-80 hover:opacity-89 uppercase hover:opacity-90 font-semibold p-2 text-white '>{loading ? 'Loading...' : 'Sign in'}</button>
    <OAuth/>
    </form>
    <div className='mt-3  flex gap-3'>
      <p>
      Don<a>'</a>t have an account?
      </p>
      <Link to={"/sign-up"}>
        <span className='text-blue-400 '>Sign up</span>
      </Link>
    </div>
    {error && <p className='text-red-400 mt-4' >{error}</p>}
  </div>
  );
}

export default SignIn;
