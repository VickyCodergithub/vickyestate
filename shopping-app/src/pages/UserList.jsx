import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {FaShare, FaBath, FaBed, FaChair,FaArrowRight, FaParking, FaMapMarkerAlt} from 'react-icons/fa'
import Message from './Message';



export default function UserList() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [copied, setCopied] = useState(false);
    useEffect(() => {
       
        const fetchList = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false); 
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                }
           
        };
        fetchList();
    }, [params.listingId]);
    return (
        <main>
            {loading && <p className='text-center my-7
            text-2xl' >Loading...</p>}
            {error &&
                <Link to={'/'}>
                    <p className='text-center my-7
            text-2xl' >Error...</p>
                </Link>
            }
            {
                listing && !loading && !error && (
                    <>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className='h-[650px]  mt-10'
                                            style={{
                                                background: `url(${url}) center
                                                no-repeat`, backgroundSize:'cover'
                                            } }>

                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className='fixed top-[13%] right-[3%] z-10 border 
                        rounded-full w-10 h-10 flex justify-center items-center bg-slate-200
                        cursor-pointer'>
                            <FaShare className='text-slate-500'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                        </div>
                        
                        {
                            copied && (<p className='fixed top-[23%] right-[5%] z-10
                            rounded-md bg-slate-100 p-2'>
                                Link Copied
                            </p>
                            )
                        }
                        <div className='flex flex-col max-w-4xl
                        mx-auto p-3 my-7 gap-6'>
                            <p className='text-2xl font-semibold'>
                                {listing.name}-${''}
                                {
                                    listing.offer
                                        ? listing.discountPrice.toLocaleString('en-US')
                                        : listing.regularPrice.toLocaleString('en-US')
                                }
                                {listing.type ==='rent' && '/month'}
                            </p>
                            <p className='text-gray-600 flex items-center mt-1 gap-2 text-sm'>
                                <FaMapMarkerAlt className='text-red-600' />
                                {listing.address}
                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-700 w-full
                                max-w-[200px] text-white text-center
                                p-1 rounded-md'>
                                    {listing.type==='rent' ? 'For Rent':'For Sale'}
                                </p>
                                {
                                    listing.offer && (
                                        <p className='bg-green-800 w-full 
                                        max-w-[200px] text-white
                                        text-center p-1 rounded-md'>
                                            ${+listing.regularPrice - +listing.discountPrice} DiscountPrice
                                        </p>
                                    )
                                }
                            </div>
                            <p className='text-slate-800 '>
                                <span className='font-bold uppercase text-black '>
                                    Description                            
                                </span>
                                <br/>
                                {listing.description}
                            </p>
                            <ul className='text-green-500 font-semibold text-sm
                            flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap'>

                                    <FaBath className='text-slate-700 text-lg' />
                                    {
                                        listing.bathrooms > 1
                                            ? `${listing.bathrooms} Bathrooms`
                                            : `${listing.bathrooms} Bathroom`
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap'>

                                    <FaBed className='text-slate-700 text-lg' />
                                    {
                                        listing.bedrooms > 1
                                            ? `${listing.bedrooms} Bedrooms`
                                            : `${listing.bathrooms} Bedroom`
                                    }
                                </li>
                                 <li className='flex items-center gap-1 whitespace-nowrap'>

                                    <FaParking className='text-slate-700 text-lg' />
                                    {
                                        listing.parking ? 'Parking Space' : 'No Parking'
                                           
                                    }
                                </li>
                                 <li className='flex items-center gap-1 whitespace-nowrap'>

                                    <FaChair className='text-slate-700 text-lg' />
                                    {
                                        listing.furnished ? 'Furnished' : 'Unfurnished'
                                    }
                                </li>
                                
                            </ul>
                            {
                                currentUser && !message && listing.userRef !== currentUser._id && (
                                    <button onClick={()=>setMessage(true)} className='bg-green-900 rounded-lg 
                                          uppercase text-white p-3'
                                    >
                                        Message Owner
                                    </button>
                                )
                                
                            }
                            {
                            message&&(<Message listing={listing}/>)
                                
                           } 
                           
                        </div>
                    </>
                )
            }
        </main>
    );
}

