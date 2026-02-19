import React from "react";
import Link from "next/link";

export default function Screenshots() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-28 px-6">

      {/* Page Hero */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-[#4a609b] mb-4">
          Screenshots & Website Monitoring
        </h1>
        <p className="text-[#4a609b] text-lg">
          Monitor employee activity on apps and websites in real-time. Gain insights into productivity trends, ensure focus, and make informed decisions.
        </p>
      </section>

      {/* Key Features */}
      <section className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Website Tracking</h3>
          <p className="text-[#4a609b] text-sm">
            See which websites employees access during work hours to ensure focus and productivity.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Application Monitoring</h3>
          <p className="text-[#4a609b] text-sm">
            Track which applications are used and for how long to analyze work efficiency and app usage trends.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105 ">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Reports & Insights</h3>
          <p className="text-[#4a609b] text-sm">
            Generate detailed analytics reports for HR and Admin to identify patterns and optimize workflow.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 1: Capture Activity</h4>
            <p className="text-[#4a609b] text-sm">
              Our system captures app and website usage seamlessly in real-time without interfering with employee workflows.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 2: Analyze Data</h4>
            <p className="text-[#4a609b] text-sm">
              Collected data is analyzed to track productivity patterns, identify inefficiencies, and create actionable insights.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 3: Generate Reports</h4>
            <p className="text-[#4a609b] text-sm">
              Admin and HR can access detailed dashboards and reports for attendance, focus, and productivity analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-12">
          Benefits of Website & App Monitoring
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Increase Productivity</h3>
            <p className="text-[#4a609b] text-sm">
              Identify unproductive patterns and help employees stay focused on tasks that matter.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Data-Driven Insights</h3>
            <p className="text-[#4a609b] text-sm">
              Use analytics to improve workflows, set realistic goals, and manage resources effectively.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Accountability & Transparency</h3>
            <p className="text-[#4a609b] text-sm">
              Maintain transparency with reports and ensure team members are accountable for their tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#4a609b] mb-6">
          Ready to Monitor Your Team?
        </h2>
        <p className="text-[#4a609b] mb-8">
          Start using our smart monitoring platform to track apps, websites, and employee productivity efficiently.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/get-started">
            <button className="bg-[#2061c4] text-white font-semibold px-6 py-3 rounded-3xl hover:bg-[#3d83d6] transition">
              Get Started
            </button>
          </Link>
          <Link href="/watch-demo">
            <button className="border border-[#4a609b] text-[#4a609b] px-6 py-3 rounded-3xl font-semibold hover:bg-[#d9e9f6] transition">
              Watch Demo
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
