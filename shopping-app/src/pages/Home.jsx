/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css/bundle';
import ListingItems from '../components/ListingItems';
import { FaHome } from 'react-icons/fa';



const Home = () => {
  SwiperCore.use([Navigation])
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=5`);
        const data = await res.json();
        setOfferListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=5`);
        const data = await res.json();
        setSaleListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error)
      }
    }
      const fetchRentListing = async () => {
        try {
        const res = await fetch(`/api/listing/get?type=rent&limit=5`);
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error)
      }
      }
      fetchOfferListing();
    }, []);
  return (
    <div className="gap-4" 
    >
      
      <div style={{backgroundImage:'url(https://cdn.pixabay.com/photo/2012/03/04/00/43/architecture-22039_1280.jpg)', backgroundSize:'cover'}}
      className="flex flex-col p-20 px-5
      mx-auto gap-4 w-full bg-no-repeat bg-cover backdrop-brightness-[0.0] mb-10"
        >
        <p className=' italic font-semibold
        text-white flex flex-row
        items-center gap-1'>
          Welcome to VickyEstate Agency
        <FaHome className='items-center text-white '/>
        </p>
        <h1 className='text-3xl text-white
        font-bold sm:text-6xl '>
          Find your next desired 
          <br/>
          dream Home with ease
        </h1>
        <div className='text-white text-md
        sm:text-sm italic'>
          <b className='text-red-700 font-extrabold'>VickyEstate</b> is the best place to find your
          dream home, easy and comfortable...
          <br />
          Our services also include varieties of properties 
          that suites your choice..
          <br/>
          What are you waiting for?
          <Link to={'/search'} className='text-yellow-300 hover:underline'
          >
            Let's get started
          </Link> 
        </div>
        <Link to={'/search'}>
          <button className='border p-3
          bg-red-600 text-white uppercase
          hover:opacity-90 rounded-lg font-semibold
          sm:text-sm'>Get Started</button>
        </Link>
      </div>
      <div>
        
          <Swiper navigation >
          {
            offerListing && offerListing.length > 0 &&
            offerListing.map((listing) => (
              <SwiperSlide>
                <Link to={`/listing/${listing._id}`}>
          
                <div style={{
                  background: `url(${listing.imageUrls[0]})
                  center no-repeat`, backgroundSize: "cover"
                }}
                  className='h-[650px]'
                  key={listing._id}>

                  </div>
                  </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>        
        
        
      </div>
      <div className='max-w-6xl mx-auto p-5
      flex flex-col gap-6 my-20'>
        {
          offerListing && offerListing.length > 0 && (
            <div className=''>
              <div>
                <h1 className='text-2xl'>
                  Recent Offers
                </h1>
                <Link to={'/search?offer=true'}
                  className='text-blue-600 hover:underline'>
                  more offers
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  offerListing.map((listing) => (
                    <ListingItems
                      key={listing._id}
                      listing={listing}   
                    />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListing && saleListing.length > 0 && (
            <div className=''>
              <div>
                <h1 className='text-2xl'>
                  Recent Proerties Sales
                </h1>
                <Link to={'/search?type=sale'}
                className='text-blue-600 hover:underline'>
                  more properties sales
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  saleListing.map((listing) => (
                    <ListingItems
                      key={listing._id}
                      listing={listing}   
                    />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListing && rentListing.length > 0 && (
            <div className=''>
              <div>
                <h1 className='text-2xl'>
                  Recent Propeties for Rent 
                </h1>
                <Link to={'/search?type=rent'}
                className='text-blue-600 hover:underline'>
                  more properties for rent
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  rentListing.map((listing) => (
                    <ListingItems
                      key={listing._id}
                      listing={listing}   
                    />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  ) 
};

export default Home;
