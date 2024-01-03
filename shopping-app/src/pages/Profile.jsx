/** @format */


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  startUpdateUser,
  successUpdateUser,
  failureUpdateUser,
  startDeleteUser,
  failureDeleteUser,
  successDeleteUser,
  startSignOutUser
} from '../toolkit/user/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [showListError, setShowListError] = useState(false);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePercentage);
  console.log(fileError)
  

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  useEffect(() => {
    if (file) {
      handleFileUpload(file);

    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName); 
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress))
      },
    (error) => {
      setFileError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
    }
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(startUpdateUser());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(failureUpdateUser(data.message));
        return;
      }
     
      dispatch(successUpdateUser(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(failureUpdateUser(error.message));
    }
  };


  const handleDelete = async () => {
try {
  dispatch(startDeleteUser());
  const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (data.success === false) {
    dispatch(failureDeleteUser(data.message));
    return;
  }
  dispatch(successDeleteUser(data)); 
} catch (error) {
  dispatch(failureDeleteUser(error.message))
}
  }

  const handleSignOut = async () => {
    try {
      dispatch(startSignOutUser());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if (data.success === false) {
      dispatch(failureDeleteUser(data.message));
      return;
      }
      dispatch(successDeleteUser(data));
  } catch (error) {
      dispatch(failureDeleteUser(data.message));
  }
  } 
  const handleShowList = async () => {
    try {
      setShowListError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListError(true);
        return;
      }
      setUserList(data);
    } catch (error) {
      setShowListError(true);
    }
  };
  const handleDeleteList = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserList((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='max-w-lg mx-auto flex flex-col min-h-screen p-3'>
      <h1 className='text-3xl text-center font-bold m-7'>Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])}
          type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} alt='profileimg'
          className='rounded-full cursor-pointer object-cover 
          w-12 h-12 self-center'
        />
        <p className='text-sm self-center '>
          {fileError ? (
            <span className='text-red-600'>Error Uploading Image(Image must be less than 2mb)</span>
          ):filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-purple-700'> {`Upload in progress ${filePercentage}`}</span>
            ):filePercentage === 100 ? (
                <span className='text-green-600'>Upload Successful</span>
              ) : (
                 "" 
              )   
        }
        </p>
        <input type='text' onChange={handleChange} defaultValue={currentUser.username} placeholder='input your username ' className='rounded-lg border p-2' id='username' />
        <input type='email' onChange={handleChange} defaultValue={currentUser.email} placeholder='input your email address' className='rounded-lg border p-2 ' id='email' />
        <input type='password' onChange={handleChange} placeholder='input password' className='rounded-lg border p-2 ' id='password' />
        <button disabled={loading} className='bg-green-600 rounded-lg disabled:opacity-80  uppercase hover:opacity-90 font-semibold p-2 text-white '>
          {loading ? 'Loading...' : 'update profile'}</button>
        <Link className='bg-red-700 p-2
         text-white
          text-center
          font-semibold uppercase
         rounded-lg
         hover:opacity-95'
          to={"/create-listing"}>
          Create a Listing
        </Link>
      </form>
      <div className=' flex justify-between mt-2'>
        <span onClick={handleDelete} className='text-red-600  cursor-pointer'>
          Remove account
        </span>
        <span  onClick={handleSignOut} className='text-red-600  cursor-pointer'>
          Sign out
        </span>
      
      </div>
      <p className='text-red-700'>
          {error ? error: ""}
      </p>
      <p>
        {updateSuccess? (<span className='text-green-600'>Updated Successfully</span>):""}
      </p>
      <button onClick={handleShowList}
        className='text-green-700 w-full'>View Listing</button>
      <p className='text-red-700 mt-5'>{showListError ? "Error In Showing Your Lists" : ""}</p>
      {userList && userList.length > 0 &&
        <div className='flex flex-col'>
          <h1 className=' mt-6 text-2xl text-center font-semibold'>Listings</h1>
          {userList.map((listing) =>
            <div key={listing._id} className='border rounded-lg p-3 flex 
        justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]}
                  alt="Could not Load Image"
                  className='h-17 w-16 object-contain ' />
              </Link>
              <Link to={`/listing/${listing._id}`}
                className='text-black-500 font-semibold 
              hover:underline truncate flex-1'>
                <p >{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <Link to={`/update-listing/${listing._id}`}>
                <button className='text-greeb-700 uppercase'>edit</button>
                </Link>
                 
                <button onClick={()=>handleDeleteList(listing._id)} className='text-red-700 uppercase'>Delete</button>
              
              </div>
            </div>
          )}
        </div>
        
        }
    </div>);
};

export default Profile;
