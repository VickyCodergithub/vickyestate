import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type:'',
        furnished: false,
        parking: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice:50,
    });
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError]=useState(false)
    console.log(formData);    
    const handleSubmitImage = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 2) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];


            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
          
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls:
                        formData.imageUrls.concat(urls)
                   
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError("Image upload failed(must be less than 2mb)")
                setUploading(false);
            })
           
        } else {
            setImageUploadError("You can only upload one Image")
            setUploading(false);
        }
    };
    const storeImage = async (file) => { 
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName); 
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                                       const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {

                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                      resolve(downloadURL);
                    })
                }
            )
        });
    }
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !==
                index),
    })
    }
    const handleChange = (e) => { 
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData, type: e.target.id
            })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id ==='offer'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })

        }
        if (
            e.target.type === 'number'
            || e.target.type === 'text'
            || e.target.type === 'textarea'
        )
        {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
                
            })
        }
        

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError("Upload at least one image")
            if(+formData.regularPrice < +formData.discountPrice ) return setError("Regular price must be higher than the discount price")
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                    username: currentUser._id
                  
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
       
    }
    return (
        <main className='p-3 max-w-4xl mt-10 mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create a Listing
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col flex-1 gap-3' >
                  
                    <input
                        className='border rounded-lg p-2 '
                        placeholder='Enter building name'
                        maxLength={50} type='text'
                        value={formData.name}
                        onChange={handleChange}
                        id='name'
                        required
                    />
                    <textarea
                        className='border rounded-lg p-2 '
                        placeholder='Enter a description'
                        type='text'
                        id='description'
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />
                    <input
                        className='border rounded-lg p-2 '
                        placeholder='Enter Your address'
                        maxLength={200} type='text'
                        id='address'
                        onChange={handleChange}
                        value={formData.address}
                        required
                    />
                    <div className='flex flex-wrap gap-9'>
                        <div className='flex gap-1'>
                            <input type='checkbox'
                                className='w-5 '
                                onChange={handleChange}
                                id='sale'
                                checked={formData.type === 'sale'}
                            />
                            <span
                                className='font-semibold'>
                                Sell
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox'
                                className='w-5 '
                                id='furnished'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span
                                className='font-semibold'>
                                Furnished
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox'
                                className='w-5 '
                                id='parking'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span
                                className='font-semibold'>
                                Parking Spot
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox'
                                className='w-5 '
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                                id='rent'
                            />
                            <span
                                className='font-semibold'>
                                Rent
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <input type='checkbox'
                                className='w-5 '
                                onChange={handleChange}
                                checked={formData.offer}
                                id='offer'
                            />
                            <span
                                className='font-semibold'>
                                offer
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-8'>
                        <div className='flex items-center gap-1'>
                            <input
                                type='number'
                                id='bedrooms'
                                min={0} max={10}
                                required
                                onChange={handleChange}
                                value={formData.bedrooms}
                                className=' border border-green-500 rounded-md p-2'
                            />
                            <p>Bedrooms</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input
                                type='number'
                                id='bathrooms'
                                min={0} max={10}
                                required
                                onChange={handleChange}
                                value={formData.bathrooms}
                                className='border 
                               border-green-500 
                               rounded-md p-2'
                            />
                            <p>Bathrooms</p>
                        </div>

                        <div className='flex items-center gap-1'>
                            <input
                                type='number'
                                id='regularPrice'
                                min={50} max={1000000}
                                required
                                onChange={handleChange}
                                value={formData.regularPrice}
                                className='border
                               border-green-500 
                               rounded-md 
                               p-2'
                              
                            />
                            <div className='flex flex-col 
                          items-center'
                            >
                                <p>Regular Price</p>
                                <p className='text-xs'>($ per Month)</p>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-1'>
                                <input
                                    type='number'
                                    id='discountPrice'
                                    min={50} max={1000000}
                                    required
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                    className='border
                                    border-green-500 
                                    rounded-md 
                                    p-2'
                                />
                                <div>
                                    <p>Discounted Price</p>
                                    <p className='text-xs'>($ per Month)</p>
                                </div>
                            </div>
                        )}
                       
                    </div>
                </div>
                <div className='flex flex-1  flex-col'>
                  
                    <p className='font-semibold text-center '> Images
                        <span className='text-xs'>(Max 1)</span>
                    </p>
                 
                    <div className='flex gap-3 '>
                        <input type='file'
                            onChange={(e) => setFiles(e.target.files)}
                            className='border w-full 
                          border-grey-700 p-2 rounded-lg'
                            accept='image/*'
                            multiple
                            id='images'
                        />
                        <button onClick={handleSubmitImage}
                            disabled={uploading}
                            className='border rounded-lg p-3 
                      text-green-700 uppercase 
                      hover:shadow-lg
                      hover:bg-green-700
                      hover:text-white
                      disabled:opacity-80'>
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                            return (
                                <div className='flex justify-between p-2 border items-center' key={url}>
                                    <img src={url} alt='image'
                                        className='w-32 h-32' />
                                    <button type='button'
                                        onClick={(e) => handleRemoveImage(index)}
                                        className='text-red-700 
                                      p-2 rounded-lg
                                      uppercase
                                      border 
                                      bg-white
                                      hover:opacity-80'>
                                        Delete
                                    </button>
                                </div>
                            )
                        })
                    }
       
                    <button disabled={loading || uploading}
                        className='p-3
                   bg-slate-700
                   mt-2
                   hover:opacity-95
                   disabled:opacity-80
                    border
                    rounded-lg
                  text-white
                    uppercase'
                    >
                        {loading ? "Creating..." : 'Create a Listing'}
                    </button>
                    {error && <p className='text-red-700 text-sm' >{error}</p>}
                </div>
            </form>
        </main>
    );
}

export default CreateListing;