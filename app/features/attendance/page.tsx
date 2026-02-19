import Link from "next/link";

export default function Attendance() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-28 px-6">

      {/* HERO SECTION */}
      <section className="text-center px-6 lg:px-24 py-16 bg-[#f4f8ff]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4a609b]">
          Smart Attendance Tracking
        </h1>
        <p className="mt-6 text-lg text-[#4a609b] max-w-3xl mx-auto">
          Monitor employee attendance in real-time with automated shift tracking,
          time logs, and department-based reporting.
        </p>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-24 py-16 grid md:grid-cols-3 gap-10">
        <div className="bg-white shadow-lg p-8 rounded-2xl hover:shadow-xl transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b]">Real-Time Check-In</h3>
          <p className="mt-4 text-[#4a609b] text-sm">
            Employees can check in and out digitally with accurate timestamps,
            ensuring proper attendance records automatically.
          </p>
        </div>

        <div className="bg-white shadow-lg p-8 rounded-2xl hover:shadow-xl transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b]">Shift Monitoring</h3>
          <p className="mt-4 text-[#4a609b] text-sm">
            Track morning, evening, and custom shifts easily, with automated reporting for each team and department.
          </p>
        </div>

        <div className="bg-white shadow-lg p-8 rounded-2xl hover:shadow-xl transition cursor-pointer hover:scale-105">
          <h3 className="text-xl font-semibold text-[#4a609b]">Department Reports</h3>
          <p className="mt-4 text-[#4a609b] text-sm">
            HR and Admin dashboards receive automatic updates, helping managers quickly assess attendance and compliance.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-8">
          How Attendance Tracking Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 1: Digital Check-In</h4>
            <p className="text-[#4a609b] text-sm">
              Employees check in/out using the web app or mobile app. All timestamps are logged automatically.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 2: Shift Assignment</h4>
            <p className="text-[#4a609b] text-sm">
              Admin can assign shifts to employees by department or team, ensuring correct coverage.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h4 className="text-lg font-semibold text-[#4a609b] mb-2">Step 3: Real-Time Reporting</h4>
            <p className="text-[#4a609b] text-sm">
              Attendance data updates instantly on dashboards for HR, Admin, and department heads.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-[#4a609b] mb-12">
          Benefits of Smart Attendance
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Accurate Records</h3>
            <p className="text-[#4a609b] text-sm">
              Eliminate manual errors and maintain reliable attendance logs for every employee.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Time-Saving</h3>
            <p className="text-[#4a609b] text-sm">
              Automate shift monitoring and reporting, freeing HR and management time for more important tasks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition cursor-pointer hover:scale-105">
            <h3 className="text-xl font-semibold text-[#4a609b] mb-2">Better Compliance</h3>
            <p className="text-[#4a609b] text-sm">
              Ensure employees follow attendance policies with clear, automated logs and department-wise reports.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#4a609b] mb-6">
          Ready to Streamline Attendance?
        </h2>
        <p className="text-[#4a609b] mb-8">
          Get started with our smart attendance platform and track your workforce efficiently.
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
