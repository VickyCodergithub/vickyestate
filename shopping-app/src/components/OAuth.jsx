import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { successInSignIn } from '../toolkit/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const googleAuthProvider=new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, googleAuthProvider)
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    pfp: result.user.photoURL,
                }),
                
            })
            const formData = await res.json();
            dispatch(successInSignIn(formData));
            naviagte("/")
        } catch (error) {
            console.log('could not sign in with google', error)
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='rounded-lg border hover:opacity-90 text-white uppercase font-semibold bg-red-700 p-2'>Sign In with Goggle</button>
  )
}

export default OAuth;