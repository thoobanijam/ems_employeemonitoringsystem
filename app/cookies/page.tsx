'use client'

import React from 'react';
import { FiLink } from 'react-icons/fi';

const CookiesPage = () => {

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const Heading = ({
    id,
    children,
    level = 1,
  }: {
    id: string;
    children: React.ReactNode;
    level?: 1 | 2;
  }) => {
    const Tag = level === 1 ? 'h1' : 'h2';
    return (
      <Tag
        id={id}
        className="group inline-flex items-center font-bold text-[#4a609b] cursor-pointer mb-5 hover:text-[#2f4b91] transition"
      >
        {children}
        <FiLink
          className="ml-2 opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-[#4a609b]"
          size={20}
          onClick={() => handleCopyLink(id)}
        />
      </Tag>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 mt-8">
      <div className="w-full max-w-5xl bg-white p-16 rounded-3xl shadow-2xl">
        {/* Page Title */}
        <Heading id="cookies-policy" level={1}>
          Cookies Policy
        </Heading>

        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Our Employee Monitoring System uses cookies to enhance your experience and provide useful features. This Cookies Policy explains what cookies are, how we use them, and your choices regarding their use.
        </p>

        <Heading id="what-are-cookies" level={2}>
          1. What Are Cookies
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Cookies are small text files stored on your device when you visit a website. They help the system remember your preferences, login sessions, and other useful information to improve your experience.
        </p>

        <Heading id="how-we-use-cookies" level={2}>
          2. How We Use Cookies
        </Heading>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg leading-relaxed">
          <li>To keep you logged in and maintain session data.</li>
          <li>To personalize your experience on the platform.</li>
          <li>To collect anonymous analytics for system performance improvement.</li>
        </ul>

        <Heading id="types-of-cookies" level={2}>
          3. Types of Cookies We Use
        </Heading>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg leading-relaxed">
          <li><strong>Essential Cookies:</strong> Necessary for system operation and security.</li>
          <li><strong>Performance Cookies:</strong> Help us analyze system usage and improve performance.</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
        </ul>

        <Heading id="your-choices" level={2}>
          4. Your Choices
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          You can manage or disable cookies in your browser settings. Note that disabling essential cookies may limit some features of the system.
        </p>

        <Heading id="changes-to-cookies-policy" level={2}>
          5. Changes to This Policy
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We may update this Cookies Policy from time to time. Any updates will be posted on this page, and continued use of the system constitutes acceptance.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Effective Date: February 19, 2026
        </p>
      </div>
    </main>
  );
};

export default CookiesPage;
