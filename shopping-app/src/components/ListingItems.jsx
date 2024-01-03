import { FaMapMarkerAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function ListingItems ({listing}) {
  return (
      <div className="bg-white shadow-md sm:w-[330px]
      transition-shadow hover:shadow-lg w-full
      overflow-hidden rounded-lg"
      >
          <Link className='w-500px' to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]}
                  className="h-[500px] w-full sm:h-[300px] 
                  object-cover hover:scale-105 
                  transition-scale duration-300 "
                  alt={listing.name}
              />
              <div className="p-3 flex flex-col gap-2 w-full">
                  <p className="font-semibold truncate
                  text-lg text-slate-600"
                  >{listing.name}
                  </p>
                 <div className="flex gap-1 items-center">
                    <FaMapMarkerAlt className=" h-4 w-4 text-red-600" />
                    <p className="text-sm truncate">{listing.address}</p>
                </div>
                <p className=" line-clamp-3
                        text-sm text-slate-600" >
                  {listing.description}
                </p>
                <p className=" text-slate-700
                mt-2 font-semibold flex items-center">${listing.offer
                  ?
                  listing.discountPrice.toLocaleString('en-US') :
                  listing.regularPrice.toLocaleString('en-US')}
                  { listing.type ==='rent' && '/month'}
                </p>
                <div className="flex  gap-4 text-slate-700">
                  <div className="font-bold text-xs">
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                    
                  </div>
                  <div className="font-bold text-xs">
                    {listing.bedrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                  </div>
                </div>
              </div>
          </Link>
          
    </div>
  )
}

