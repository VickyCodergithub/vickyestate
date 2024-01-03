import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import UserList from './pages/userList';
import PrivateProfile from './components/PrivateProfile';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/Update-Listing';
import SearchList from './pages/SearchList';
import Footer from './pages/Footer';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='listing/:listingId' element={<UserList/>}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='search' element={<SearchList/>}/>
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateProfile />}>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing/>}  />
     </Route>
         
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
