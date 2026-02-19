'use client'

import React from 'react';
import { FiLink } from 'react-icons/fi';

const TermsOfServicePage = () => {

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
        <Heading id="terms-of-service" level={1}>
          Terms of Service
        </Heading>

        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Welcome to our Employee Monitoring System. By using our platform, you agree to comply with the following terms and conditions.
        </p>

        <Heading id="acceptance-of-terms" level={2}>
          1. Acceptance of Terms
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          By accessing or using the system, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>

        <Heading id="user-responsibilities" level={2}>
          2. User Responsibilities
        </Heading>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg leading-relaxed">
          <li>Use the system in compliance with company policies and applicable laws.</li>
          <li>Maintain the confidentiality of your login credentials.</li>
          <li>Do not engage in any activity that may compromise the system or other users.</li>
        </ul>

        <Heading id="system-access" level={2}>
          3. System Access
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Access to the system is granted by the company and may be revoked at any time. Unauthorized access is strictly prohibited.
        </p>

        <Heading id="data-usage" level={2}>
          4. Data Usage
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          All data collected by the system is for monitoring, reporting, and improving company operations. Users should not misuse or share this data externally.
        </p>

        <Heading id="intellectual-property" level={2}>
          5. Intellectual Property
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          All content, software, and materials provided in the system are owned by the company and protected by copyright laws.
        </p>

        <Heading id="limitation-of-liability" level={2}>
          6. Limitation of Liability
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          The company is not liable for any direct, indirect, or consequential damages resulting from your use of the system.
        </p>

        <Heading id="changes-to-terms" level={2}>
          7. Changes to Terms
        </Heading>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We may update these Terms of Service periodically. Any updates will be posted on this page, and continued use of the system constitutes acceptance.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Effective Date: February 19, 2026
        </p>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
