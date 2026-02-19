import React from "react";
import Link from "next/link";

export default function Tasks() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-28 px-6">

      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-[#4a609b] mb-4">
          Task & Project Management
        </h1>
        <p className="text-[#4a609b] text-lg">
          Assign, monitor, and track tasks and projects efficiently. Ensure every team member stays on target with clear deadlines, updates, and progress tracking.
        </p>
      </section>

      {/* Key Features */}
      <section className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Task Assignment</h3>
          <p className="text-[#4a609b] text-sm">
            Assign tasks to individual employees or teams with deadlines, priority levels, and instructions.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Progress Tracking</h3>
          <p className="text-[#4a609b] text-sm">
            Track task completion, project milestones, and progress percentage in real-time for better team oversight.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b] mb-3">Project Analytics</h3>
          <p className="text-[#4a609b] text-sm">
            Generate comprehensive reports on project performance, bottlenecks, deadlines, and team productivity.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 1: Assign Tasks</h4>
            <p className="text-[#4a609b] text-sm">
              Managers assign tasks to teams or individuals with due dates and priority levels.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 2: Track Progress</h4>
            <p className="text-[#4a609b] text-sm">
              Employees update task status, while managers view real-time progress and completion rates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 3: Analyze Performance</h4>
            <p className="text-[#4a609b] text-sm">
              Generate analytics to see team productivity, identify delays, and optimize workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-12">
          Benefits of Task & Project Management
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Boost Productivity</h3>
            <p className="text-[#4a609b] text-sm">
              Keep employees focused and organized by assigning clear tasks with deadlines.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Enhance Collaboration</h3>
            <p className="text-[#4a609b] text-sm">
              Teams can collaborate effectively, track dependencies, and complete projects faster.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Data-Driven Decisions</h3>
            <p className="text-[#4a609b] text-sm">
              Analyze task performance and project completion rates to optimize planning and resource allocation.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#4a609b] mb-6">
          Ready to Manage Tasks Efficiently?
        </h2>
        <p className="text-[#4a609b] mb-8">
          Start using our platform to assign, track, and analyze projects in real-time.
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
