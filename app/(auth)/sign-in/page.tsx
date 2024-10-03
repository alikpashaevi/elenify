"use client"
import React from 'react'
import { useState } from 'react'

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col items-center justify-center  px-20 py-12 rounded-md bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
      <div className="mb-6">
        <p className="inline mr-2">Login with Google:</p>
        <span className="bg-gray-100 px-3 py-1 rounded">G</span>
      </div>
      <form className="w-full max-w-sm">
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
        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  )
}

export default SignInPage
