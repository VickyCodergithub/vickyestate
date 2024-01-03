import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItems from '../components/ListingItems';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function SearchList() {
 /*{
  if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';
      setSearchbardata({
        ...searchbardata, sort, order});
    }
 }*/
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showmore, setShowmore] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchbardata, setSearchbardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });
  console.log(searchbardata);
  console.log(listings);

  const handleChange = (e) => {
    if (e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSearchbardata({
        ...searchbardata,
        type: e.target.id
      });
    }
    if (e.target.id === 'searchTerm') {
      setSearchbardata({
        ...searchbardata,
        searchTerm: e.target.value
      });
    }
    if (e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSearchbardata({
        ...searchbardata,
        [e.target.id]:
          e.target.checked ||
            e.target.checked === 'true' ? true : false,
      });
  
    }
    if (e.target.id === 'sort_order') {
    const [sortValue, orderValue] = e.target.value.split('_');
    const sort = sortValue || 'createdAt';
    const order = orderValue || 'desc';

    setSearchbardata({ ...searchbardata, sort, order });
  }
   
  };
 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchbardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc'
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowmore(false);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await response.json();
      if (data.length > 5) {
        setShowmore(true);
      } else {
        setShowmore(false);
      }
      setListings(data);
      setLoading(false);
      
    }
    fetchListings();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchbardata.searchTerm);
    urlParams.set('type', searchbardata.type);
    urlParams.set('parking', searchbardata.parking);
    urlParams.set('furnished', searchbardata.furnished);
    urlParams.set('offer', searchbardata.offer);
    urlParams.set('sort', searchbardata.sort);
    urlParams.set('order', searchbardata.order);
    const searchQuery = urlParams.toString();

    const response = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await response.json();
    setListings(data);
    navigate(`/search?${searchQuery}`);
  };
  const onClickShowMore = async () => {
    const numOfListings = listings.length;
    const startIndex = numOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 6) {
      setShowmore(false);
    }
    setListings([...listings, ...data]);
  }
  const onClickShowLess = () => {
    const initListings = listings.slice(0, 5);
    setListings(initListings);
    setShowmore(true);
  }
  
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
          <div className='flex gap-2 items-center'>
            <label className='font-semibold whitespace-nowrap'>
              Search Term:
            </label>
            <input id='searchTerm' className='w-full p-3 rounded-lg'
              onChange={handleChange}
              value={searchbardata.searchTerm}
              type='text' placeholder='Search...' />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input id='all' className='w-5'
                onChange={handleChange}
                checked={searchbardata.type === 'all'}
                type='checkbox'
              />
              <span>Rent & Sale</span>
            </div>
             <div className='flex gap-2'>
              <input id='rent' className='w-5'
                type='checkbox'
                onChange={handleChange}
                checked={searchbardata.type ==='rent'}
              />
              <span>Rent</span>
            </div>
             <div className='flex gap-2'>
              <input id='sale' className='w-5'
                type='checkbox'
                onChange={handleChange}
                checked={searchbardata.type ==='sale'}
              />
              <span>Sale</span>
            </div>
             <div className='flex gap-2'>
              <input id='offer' className='w-5'
                type='checkbox'
                onChange={handleChange}
                checked={searchbardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Features:</label>
            <div className='flex gap-2'>
              <input id='parking' className='w-5'
                type='checkbox'
                onChange={handleChange}
                checked={searchbardata.parking}
              />
              <span>Parking</span>
            </div>
             <div className='flex gap-2'>
              <input id='furnished' className='w-5'
                type='checkbox'
                onChange={handleChange}
                checked={searchbardata.furnished}
              />
              <span>Furnished</span>
            </div> 
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort by:</label>
            <select
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              id='sort_order' className='p-2
             rounded-lg border'>
              <option  value='regularPrice_desc'>Price High to Low</option>
              <option value='regularPrice_asc'>Price Low to High</option>
              
            </select>
          </div>
          <button className='w-full bg-slate-700 
          text-white font-semibold p-2 rounded-lg
          uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className=' flex flex-col  ' >
        <h1 className='text-3xl border-b border-transparent font-semibold
       mt-5  p-3'>Searched Listings:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {
            !loading && listings.length === 0 && (
              <p className='text-red-500 text-xl'>Listing Not Found!</p>
            )
          }
          {
            loading && (
              <p className='text-slate-700 w-full text-center text-2xl'>Loading...</p>
            )
          }
          {
            !loading && listings &&
            listings.map((listing) => (
              <ListingItems 
                key={listing._id}
                listing={listing}
              />
            ))
          }
          {
           showmore &&(
              <FaArrowDown onClick={onClickShowMore}
                className='text-green-500 text-xl
               items-center w-full'/>
            )
          }
          {
           !showmore && listings.length > 5 && (
              <FaArrowUp className='text-green-600
              text-xl items-center w-full'
              onClick={onClickShowLess}
              />
              
            )
          }

       </div>
      </div>
    </div>
  )
}

