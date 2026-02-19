'use client'

import React, { useState } from 'react';
import {
  AiOutlineMail,
  AiOutlineSend,
  AiOutlineStar,
  AiOutlineInbox,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsGear } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { MdOutlineTask } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'inbox' | 'sent' | 'archive'>('compose');

  const tabs = [
    { name: 'Compose', key: 'compose', icon: <AiOutlineMail size={22} /> },
    { name: 'Inbox', key: 'inbox', icon: <AiOutlineInbox size={22} /> },
    { name: 'Sent', key: 'sent', icon: <AiOutlineSend size={22} /> },
    { name: 'Archive', key: 'archive', icon: <AiOutlineStar size={22} /> },
  ];

  const tabStyle = (key: string) =>
    `flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold transition transform cursor-pointer ${
      activeTab === key
        ? 'bg-[#4a609b] text-white shadow-lg scale-105'
        : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
    }`;

  const emailCardStyle =
    'p-5 bg-white rounded-xl shadow hover:shadow-lg transition flex justify-between items-center cursor-pointer';

  // Dashboard stats without bold colors
  const stats = [
    { title: 'Inbox', count: 23, icon: <AiOutlineInbox size={28} className="text-[#4a609b]" /> },
    { title: 'Sent', count: 17, icon: <AiOutlineSend size={28} className="text-[#4a609b]" /> },
    { title: 'Archived', count: 12, icon: <AiOutlineStar size={28} className="text-[#4a609b]" /> },
  ];

  // Recent activities
  const activities = [
    { user: 'Employee 1', message: 'Requested leave approval', time: '10:21 AM' },
    { user: 'Employee 2', message: 'Sent HR feedback form', time: '09:45 AM' },
    { user: 'Employee 3', message: 'Submitted training request', time: 'Yesterday' },
    { user: 'Employee 4', message: 'Updated personal details', time: '2 days ago' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 gap-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold text-[#4a609b] mb-6">HR Dashboard</h2>
        <div className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <div key={tab.key} className={tabStyle(tab.key)} onClick={() => setActiveTab(tab.key as any)}>
              {tab.icon} {tab.name}
            </div>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 text-gray-600 hover:text-[#4a609b] cursor-pointer">
            <AiOutlineUser size={20} /> Profile
          </div>
          <div className="flex items-center gap-3 text-gray-600 hover:text-[#4a609b] cursor-pointer">
            <BsGear size={20} /> Settings
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#4a609b] mb-2">Mail & HR Module</h1>
            <p className="text-gray-600 max-w-lg text-sm md:text-base">
              Manage all HR communications: compose emails, view inbox, track sent messages, and organize archives efficiently.
            </p>
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-2 md:mt-0">
            Logged in as: <span className="font-semibold">HR Manager</span>
          </p>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex items-center justify-between p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
            >
              <div>
                <p className="text-lg font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-xl">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4 cursor-pointer">
            <BiSend size={28} className="text-[#4a609b]" />
            <div>
              <p className="text-gray-500 font-medium">Quick Send Email</p>
              <p className="text-gray-800 font-semibold">Compose and send to employees</p>
            </div>
          </div>
          <div className="flex-1 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4 cursor-pointer">
            <MdOutlineTask size={28} className="text-[#4a609b]" />
            <div>
              <p className="text-gray-500 font-medium">Pending Tasks</p>
              <p className="text-gray-800 font-semibold">3 HR approvals pending</p>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <section className="bg-white p-8 rounded-3xl shadow max-w-6xl mx-auto">
          {/* Compose Email */}
          {activeTab === 'compose' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4a609b]">Compose New Email</h2>
              <p className="text-gray-600 text-sm md:text-base">
                Enter recipient email, subject, and message. Ensure clarity and professional tone.
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Recipient Email"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-black shadow-sm"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-black shadow-sm"
                />
                <textarea
                  placeholder="Type your message..."
                  rows={6}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-black shadow-sm"
                />
                <button className="self-end bg-[#4a609b] text-white px-8 py-3 rounded-3xl font-semibold hover:bg-[#5b72c2] transition shadow-lg">
                  Send Email
                </button>
              </div>
            </div>
          )}

          {/* Inbox */}
          {activeTab === 'inbox' && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4a609b]">Inbox</h2>
              <p className="text-gray-600 text-sm md:text-base mb-2">All incoming emails from employees and HR notifications.</p>
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                {activities.map((act, i) => (
                  <div key={i} className={emailCardStyle}>
                    <div>
                      <p className="font-semibold text-gray-800">{act.user}</p>
                      <p className="text-gray-600 text-sm">{act.message}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-gray-400 text-sm">{act.time}</p>
                      <FiClock className="text-gray-400 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sent */}
          {activeTab === 'sent' && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4a609b]">Sent Emails</h2>
              <p className="text-gray-600 text-sm md:text-base mb-2">Track all emails sent by HR to employees and internal teams.</p>
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                {[...activities].map((act, i) => (
                  <div key={i} className={emailCardStyle}>
                    <div>
                      <p className="font-semibold text-gray-800">{act.user}</p>
                      <p className="text-gray-600 text-sm">Sent notification regarding HR updates.</p>
                    </div>
                    <p className="text-gray-400 text-sm">{act.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Archive */}
          {activeTab === 'archive' && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4a609b]">Archived Emails</h2>
              <p className="text-gray-600 text-sm md:text-base mb-2">Access previously sent or received emails that are archived for reference.</p>
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                {[...activities].map((act, i) => (
                  <div key={i} className={emailCardStyle}>
                    <div>
                      <p className="font-semibold text-gray-800">{act.user}</p>
                      <p className="text-gray-600 text-sm">HR communication archived for reference.</p>
                    </div>
                    <p className="text-gray-400 text-sm">{act.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default HRDashboard;
