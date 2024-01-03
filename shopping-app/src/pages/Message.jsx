import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Message({ listing }) {
    const [message, setMessage] = useState(null);
    const [owner, setOwner] = useState('');

    const onChange = (e) => {
        setOwner(e.target.value);
    }
    


    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setMessage(data);
              
            }
            catch (error) {
                  console.log(error)
            }
           
        };
        fetchMessage();
    }, [listing.userRef] )

  return (
      <>
          {
              message && (
                  <div className='flex flex-col gap-2'>
                      <p>Contact <span className='font-semibold uppercase'>{message.username} </span> 
                       for this <span className=' font-semibold uppercase '>{listing.name}</span> building
                      </p>   
                      <textarea name='owner' id='owner' rows={2}
                          value={owner} onChange={onChange}
                          className='border border-slate-500 rounded-lg w-full p-3'
                          placeholder='Message Owner here...'
                      >
                          
                      </textarea>
                      <Link to={`mailto:${message.email}
                        ?subject=Regarding ${listing.name}
                        &body=${owner}`}
                          className='text-center w-full bg-orange-600 rounded-lg
                        p-2 uppercase text-white font-semibold'
                      >
                      Send Message
                      </Link>
                  </div>
                  
              )
          }
      </>
  )
}

