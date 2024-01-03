/** @format */

import {useState, useEffect} from 'react';
import { FaSearch, } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Logo from '../Images/Logo.jpg'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBars, faTimes);


const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] =useState('');
  const { currentUser } = useSelector(state => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])
  return (
    <header className='bg-green-800 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <div className='flex  items-center gap-1'>
          <img className='h-7 w-7' src={Logo} alt='logo.jpg' />
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
            <span className='text-orange-500'>Vicky</span>
            <span className='text-orange-300'>Estate</span>
          </h1>
        </Link>
        </div>

        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search... '
            value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)} 
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
          
        </form>

      
       
        
        <ul className='flex gap-4 font-bold items-center justify-between'>
          <Link to='/'>
            <li className='hidden lg:inline-block text-yellow-300 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden lg:inline-block text-yellow-300 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile' className='lg:inline-block hidden'>
            {
              currentUser ? (
                <div className='hidden lg:block'>
                  <img className=' rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="Profile"/>
                </div>
                
              ) : (
                <li className=' lg:inline-block text-yellow-300 hover:underline '>
                Sign in
              </li>
              )
 
            }
          
          </Link>
        </ul>
         
             <div className="block gap-3  lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <FontAwesomeIcon icon={faTimes} className="text-yellow-300" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="text-yellow-300" />
            )}
          </button>
        </div>
           <div className={`lg:hidden absolute right-0 rounded-md font-bold top-2.5 bg-green-600 z-50 ${showMenu ? 'w-1/4' : 'w-0'} transition-all duration-500 ease-in-out overflow-hidden`}>
          <div className="p-1 ">
            <button
              className="flex items-center justify-end focus:outline-none"
              onClick={() => setShowMenu(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="text-yellow-300" />
            </button>
            <Link to={'/'} onClick={() => setShowMenu(false)} className="block mt-4 text-yellow-300
             hover:underline hover:text-white">
              Home
            </Link>
            <Link to={'/about'} onClick={() => setShowMenu(false)} className="block mt-4 text-yellow-300
             hover:underline hover:text-white">
              About
            </Link>
            <Link to='/profile'   onClick={() => setShowMenu(false)}>
            {
              currentUser ? (
                <div className='flex gap-1   text-yellow-300 mt-3'>
                  <p className=' hover:text-white'>Profile</p><img className=' rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="Profile"/>
                </div>
                
                ) : (
                   
                      <p className='mt-3  text-yellow-300 hover:underline  hover:text-white'>
                       Sign in
                      </p>
                    
                
              )
 
            }
          
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
