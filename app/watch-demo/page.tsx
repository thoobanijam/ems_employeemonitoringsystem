import React from "react";
import Link from "next/link";

const WatchDemo = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-28 px-6 text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Watch Our Platform in Action
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 mb-12">
          See how our intelligent monitoring system transforms employee management,
          production tracking, and real-time analytics for your workforce.
        </p>

        {/* Video Demo */}
        <div className="relative w-full max-w-4xl mx-auto">
          <iframe
            className="w-full h-96 md:h-[500px] rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          Key Features You Will See
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Real-Time Monitoring</h3>
            <p className="text-gray-600 text-sm">
              Track employee attendance, production batches, and performance instantly.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-green-600">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Visualize productivity trends, departmental performance, and attendance summaries.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-purple-600">Secure & Scalable</h3>
            <p className="text-gray-600 text-sm">
              Role-based access control, encrypted data, and enterprise-ready architecture.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="font-bold mb-3 text-lg">1️⃣ Employee Updates</h4>
            <p className="text-gray-600 text-sm">
              Employees submit production, attendance, and performance updates in real-time.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="font-bold mb-3 text-lg">2️⃣ Instant Sync</h4>
            <p className="text-gray-600 text-sm">
              HR and Admin dashboards update automatically without manual refresh.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="font-bold mb-3 text-lg">3️⃣ Analytics & Reports</h4>
            <p className="text-gray-600 text-sm">
              Admins access comprehensive reports and actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* SECURITY & TRUST SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Secure & Reliable</h2>
        <p className="text-gray-600 mb-10">
          All data is encrypted and role-based, ensuring confidentiality and compliance.
          You can trust your workforce information is safe and accessible only to authorized personnel.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition w-60">
            <h4 className="font-bold mb-2 text-blue-600">Role-Based Access</h4>
            <p className="text-gray-600 text-sm">Employees, HR, and Admins have controlled access.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition w-60">
            <h4 className="font-bold mb-2 text-green-600">Data Integrity</h4>
            <p className="text-gray-600 text-sm">All updates are validated and securely logged.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition w-60">
            <h4 className="font-bold mb-2 text-purple-600">Scalable Architecture</h4>
            <p className="text-gray-600 text-sm">Seamless expansion as your workforce grows.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
          Sign up today and experience real-time workforce monitoring like never before.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/get-started">
            <button className="bg-white text-[#1e426d] font-semibold px-8 py-4 rounded-3xl shadow-lg hover:scale-105 transition">
              Get Started
            </button>
          </Link>
          <Link href="/get-started">
            <button className="border border-white text-white px-8 py-4 rounded-3xl font-semibold hover:bg-white hover:text-[#1e426d] transition">
              Watch Full Demo
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
};

export default WatchDemo;
