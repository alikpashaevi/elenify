"use client"
import React, {useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useRouter();

  // const validatePassword = (password: string) => {
  //   var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  //   return regex.test(password);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // if (!validatePassword(password)) {
    //   setMessage('Password must contain at least one capital letter, one symbol, one number, and be at least 8 characters long.');
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store the token in localStorage
        localStorage.setItem('token', data.accessToken);

        // Set a success message or navigate
        setMessage('Register successful');
        navigate.push('/'); // Redirect to homepage or profile page

      } else {
        // Handle invalid credentials
        const errorData = await response.json();
        setMessage(errorData.message || 'Invalid username or password');
      }
    } catch (err: any) {
      console.error(err.message);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  px-20 py-12 rounded-md bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>
      <div className="mb-6">
        <p className="inline mr-2">Sign In with Google:</p>
        <span className="bg-gray-100 px-3 py-1 rounded">G</span>
      </div>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 mb-3 text-gray-700 border rounded"
          name='username'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-3 text-gray-700 border rounded"
          name='password'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-3 text-gray-700 border rounded"
          name='confirmPassword'
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </form>
      <span className='mt-2 font-normal text-sm'>Do you already have an account? <Link href="/sign-in" className='font-medium'>Sign In</Link></span>
    </div>
  )
}

export default SignUpPage