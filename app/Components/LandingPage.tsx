import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center flex-col h-auto relative">

      {/* Hero Text */}
      <h1 className="text-[#193c62] font-bold mt-28 text-3xl md:text-5xl text-center">
        Empower Your Workforce 
        <span className="text-[#356395] font-normal"> with</span> Smart Monitoring
      </h1>

      <p className="text-[#356395] font-semibold mt-6 py-3 border-y border-[#dee9f7] text-center max-w-2xl">
        Track Productivity, Attendance, and Performance in Real-Time
      </p>

      {/* Hero Image */}
      <div className="relative w-full flex justify-center mt-8">
        <img
          src="/img/monitoring.png"
          alt="Monitoring Dashboard"
          className="w-[90%] h-auto rounded-xl"
        />

        {/* Buttons overlay */}
        <div className="absolute top-12 left-0 right-0 flex justify-center gap-4">
          <Link href="/get-started">
            <button className="bg-[#2061c4] text-white font-semibold px-6 py-3 rounded-3xl cursor-pointer hover:bg-[#3d83d6] transition">
              Get Started
            </button>
          </Link>

          <Link href="/watch-demo">
            <button className="border border-[#dee9f7] px-6 py-3 rounded-3xl font-semibold text-[#1e426d] shadow-md shadow-[#ccdcec] hover:bg-[#d9e9f6] transition">
              Watch Demo
            </button>
          </Link>
        </div>
      </div>

      {/* Extra Section */}
      <section className="py-20 px-6 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#1e426d]">Why Choose Our System?</h2>
        <p className="text-[#1e426d] mb-10">
          Get real-time insights into employee attendance, production batches, 
          and performance analytics. Our platform is secure, scalable, 
          and designed for modern businesses.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="font-bold mb-2 text-[#4a609b]">Real-Time Tracking</h3>
            <p className="text-gray-600 text-md">
              Updates instantly across all departments without delays.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="font-bold mb-2 text-[#4a609b]">Analytics</h3>
            <p className="text-gray-600 text-md">
              Detailed reports on productivity, attendance, and workflow efficiency.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="font-bold mb-2 text-[#4a609b]">Secure & Scalable</h3>
            <p className="text-gray-600 text-md">
              Role-based access control and encrypted data for safe scaling.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
