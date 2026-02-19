'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdPerson } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const HRLogin = () => {
  const router = useRouter();

  // ✅ Fixed HR credentials
  const HR_NAME = 'hr';
  const HR_EMAIL = 'hr@example.com';
  const HR_PASSWORD = 'hr123';

  const [hrName, setHrName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // password toggle

  // ✅ Single handleLogin function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      hrName === HR_NAME &&
      email === HR_EMAIL &&
      password === HR_PASSWORD
    ) {
      router.push('/hr/hrdashboard'); 
    } else {
      setError('Invalid HR credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#567d9a]">
      <div className="bg-gradient-to-r from-[#10838a] to-[#4d427c] p-8 rounded-4xl shadow w-[550px] h-[750px] shadow-[0_4px_6px_#41c6ef]">

        {/* Icon */}
        <div className="flex justify-center text-[#d2d2d2] mb-4">
          <IoMdPerson size={60} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-[#d0d0d0] mt-4">
          HR Login 
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* HR Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-[#d0d0d0] text-lg">HR Name</label>
            <input
              type="text"
              placeholder="Enter HR name"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)} // now state updates
              className="border border-[#d2d2d2] w-full px-3 text-black py-4 mb-3 rounded-xl bg-[#d1d1d1] mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-bold text-[#d0d0d0] text-lg">Email</label>
            <input
              type="email"
              placeholder="Enter HR email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#d2d2d2] bg-[#d1d1d1] w-full px-3 text-black py-4 mb-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
              required
            />
          </div>

          {/* Password with show/hide */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-bold text-[#d0d0d0] text-lg">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter HR password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#d2d2d2] bg-[#d1d1d1] w-full px-3 text-black py-4 mb-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-[#567d9a]"
              required
            />
            <div
              className="absolute top-12 right-4 cursor-pointer text-gray-700 mt-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#3d97d3] text-white text-xl font-bold w-full py-4 rounded-4xl mt-8"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <p className="text-lg text-gray-900 mt-6 text-center">
          Forgot your password?{' '}
          <span className="text-green-400 cursor-pointer">Reset</span>
        </p>
      </div>
    </div>
  );
};

export default HRLogin;
