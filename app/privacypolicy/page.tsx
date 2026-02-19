'use client'

import React from 'react';
import { FiLink } from 'react-icons/fi';

const PrivacyPolicyPage = () => {
  
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
        className="group relative font-bold text-[#4a609b] cursor-pointer mb-5 hover:text-[#2f4b91] transition"
      >
        {children}
        <FiLink
          className="absolute left-[-35px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-[#4a609b]"
          size={22}
          onClick={() => handleCopyLink(id)}
        />
      </Tag>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 mt-8">
      <div className="w-full max-w-7xl bg-white p-16 rounded-3xl shadow-2xl">
        {/* Page Title */}
        <Heading id="privacy-policy" level={1}>
          Privacy Policy
        </Heading>

        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Employee Monitoring System.
        </p>

        <Heading id="information-we-collect" level={2}>
          1. Information We Collect
        </Heading>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg leading-relaxed">
          <li>Employee personal information (name, email, contact details).</li>
          <li>Login and usage data within the monitoring system.</li>
          <li>Cookies and device information to improve website experience.</li>
        </ul>

        <Heading id="how-we-use-information" level={2}>
          2. How We Use Information
        </Heading>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg leading-relaxed">
          <li>To manage employee monitoring and reporting.</li>
          <li>To communicate system updates and announcements.</li>
          <li>To improve system performance and security.</li>
        </ul>

        <Heading id="data-security" level={2}>
          3. Data Security
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.
        </p>

        <Heading id="sharing-information" level={2}>
          4. Sharing Information
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We do not sell or share personal information with third parties, except as required by law or to provide essential services within the company.
        </p>

        <Heading id="your-rights" level={2}>
          5. Your Rights
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          You have the right to access, correct, or request deletion of your personal data. Contact the HR or system administrator for any privacy-related requests.
        </p>

        <Heading id="changes-to-policy" level={2}>
          6. Changes to This Policy
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the effective date.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Effective Date: February 19, 2026
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
