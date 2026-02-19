import React from "react";
import Link from "next/link";

const StartContactSection = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-[#4a609b] flex flex-col items-center justify-start pt-28 px-6 mb-4">

      {/* Hero Section */}
      <section className="max-w-6xl text-center bg-white shadow-lg rounded-3xl p-12 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Take Control of Your Workforce Today
        </h1>
        <p className="text-lg mb-6">
          Start tracking attendance, monitoring productivity, and managing tasks in real-time. 
          Gain full visibility into your workforce, ensuring maximum efficiency and accountability.
        </p>
        <p className="text-sm max-w-3xl mx-auto mb-10">
          Seamlessly integrate all departments, generate instant reports, and empower employees to stay on target with clear goals and actionable insights.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
          <Link href="/get-started">
            <button className="px-12 py-3 rounded-3xl cursor-pointer
                               bg-gradient-to-r from-[#eb722e] via-[#fa973b] to-[#f59237]
                               hover:from-[#ffcd03] hover:via-[#ffb703] hover:to-[#ffa200]
                               text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Start
            </button>
          </Link>

          <Link href="/contact-us">
            <button className="border px-12 py-3 rounded-3xl cursor-pointer
                               hover:bg-[#d9e9f6] text-[#4a609b] font-semibold
                               transition-all duration-300 shadow-md hover:shadow-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mt-20 grid md:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform cursor-pointer hover:scale-105">
          <h3 className="text-xl font-bold mb-3">Real-Time Attendance</h3>
          <p className="text-sm">
            Track check-ins, check-outs, and shift logs instantly across all teams. Automated reports keep managers informed without manual effort.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition transform hover:scale-105">
          <h3 className="text-xl font-bold mb-3">Task & Project Monitoring</h3>
          <p className="text-sm">
            Assign tasks, set deadlines, and monitor progress. Get actionable insights to identify bottlenecks and optimize productivity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
          <h3 className="text-xl font-bold mb-3">Analytics & Reports</h3>
          <p className="text-sm">
            Generate detailed dashboards and analytics reports for HR, admin, and team leads. Make data-driven decisions quickly and effectively.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
            <p className="text-sm mb-4">
              “This system transformed our HR operations. Real-time attendance and task tracking helped us improve productivity by 35%.”
            </p>
            <h4 className="font-semibold">— Jane D., HR Manager</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
            <p className="text-sm mb-4">
              “We now monitor projects seamlessly. The dashboards are intuitive and help management take quick decisions.”
            </p>
            <h4 className="font-semibold">— Mark S., Project Lead</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
            <p className="text-sm mb-4">
              “Employees love the transparency. Everyone knows their targets and progress. It’s streamlined our operations significantly.”
            </p>
            <h4 className="font-semibold">— Clara P., Operations Head</h4>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mt-20 bg-white p-12 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="hover:scale-105 cursor-pointer">
            <h4 className="font-semibold text-xl mb-2">Is this platform suitable for small teams?</h4>
            <p className="text-sm">
              Yes! Our solution is designed for teams of all sizes, from small startups to large enterprises.
            </p>
          </div>
          <div className="hover:scale-105 cursor-pointer">
            <h4 className="font-semibold text-xl mb-2">Can I track employee productivity remotely?</h4>
            <p className="text-sm">
              Absolutely. Real-time dashboards and reports allow you to monitor your workforce from anywhere.
            </p>
          </div>
          <div className="hover:scale-105 cursor-pointer">
            <h4 className="font-semibold text-xl mb-2">Does it comply with data privacy regulations?</h4>
            <p className="text-sm">
              Yes, all employee data is securely stored and handled according to the latest privacy regulations and standards.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-6xl mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Take Action?</h2>
        <p className="mb-8 text-sm max-w-3xl mx-auto">
          Click "Start" to create your account and begin monitoring your workforce immediately, or click "Contact Us" to speak with our support team for personalized guidance.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-4">
          <Link href="/get-started">
            <button className="px-12 py-3 rounded-3xl cursor-pointer
                               bg-gradient-to-r from-[#eb722e] via-[#fa973b] to-[#f59237]
                               hover:from-[#ffcd03] hover:via-[#ffb703] hover:to-[#ffa200]
                               text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Start
            </button>
          </Link>
          <Link href="/contact-us">
            <button className="border px-12 py-3 rounded-3xl cursor-pointer
                               hover:bg-[#d9e9f6] text-[#4a609b] font-semibold
                               transition-all duration-300 shadow-md hover:shadow-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
};

export default StartContactSection;
