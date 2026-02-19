"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#eaf2fc] border-b border-[#dee9f7]">
      <div className="flex flex-row items-center justify-between px-6 lg:px-24 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/img/Screenshot.png"
            alt="Logo"
            className="h-10 w-10 transition-transform duration-300 hover:scale-110"
          />
          <h1 className="font-semibold text-lg md:text-2xl">
            <span className="text-[#1e426d] font-bold">EMPLOYEE</span>{" "}
            <span className="text-[#1e426d]">MONITORING SYSTEM</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8 text-[#1e426d] font-semibold relative">

          {/* Features */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("features")}
              className="flex items-center gap-1 ml-3"
            >
              Features <MdKeyboardArrowDown />
            </button>

            {openMenu === "features" && (
              <div className="absolute top-8 bg-white shadow-lg rounded-xl p-4 w-48">
                <Link href="/features/attendance" className="block py-2 hover:text-blue-600">Attendance Tracking</Link>
                <Link href="/features/performance" className="block py-2 hover:text-blue-600">Performance Reports</Link>
                <Link href="/features/live-monitoring" className="block py-2 hover:text-blue-600">Live Monitoring</Link>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("how")}
              className="flex items-center gap-1"
            >
              How It Works <MdKeyboardArrowDown />
            </button>

            {openMenu === "how" && (
              <div className="absolute top-8 bg-white shadow-lg rounded-xl p-4 w-48">
                <Link href="/how-it-works/setup" className="block py-2 hover:text-blue-600">System Setup</Link>
                <Link href="/how-it-works/workflow" className="block py-2 hover:text-blue-600">Workflow Process</Link>
                <Link href="/how-it-works/security" className="block py-2 hover:text-blue-600">Security Model</Link>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("pricing")}
              className="flex items-center gap-1"
            >
              Pricing <MdKeyboardArrowDown />
            </button>

            {openMenu === "pricing" && (
              <div className="absolute top-8 bg-white shadow-lg rounded-xl p-4 w-48">
                <Link href="/pricing/basic" className="block py-2 hover:text-blue-600">Basic Plan</Link>
                <Link href="/pricing/pro" className="block py-2 hover:text-blue-600">Pro Plan</Link>
                <Link href="/pricing/enterprise" className="block py-2 hover:text-blue-600">Enterprise</Link>
              </div>
            )}
          </div>

          {/* Get Started */}
          <Link href="/get-started">
            <button className="bg-[#2766c5] px-6 py-2 text-white rounded-3xl hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
