import Link from "next/link";

export default function GetStarted() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1e426d] via-blue-600 to-indigo-700 text-white py-28 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Smart Workforce Monitoring <br /> Made Simple
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">
          A powerful employee monitoring and production management platform 
          designed to improve productivity, transparency, and performance 
          across all departments.
        </p>

        <div className="mt-10">
          <Link href="/admin/loginadmin">
            <button className="bg-white text-[#1e426d] font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* ROLE SELECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Choose Your Access Role
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-10">

          {/* Admin */}
          <div className="bg-white shadow-2xl rounded-2xl p-10 w-full md:w-96 text-center hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Admin Panel
            </h3>

            <p className="text-gray-600 mb-6">
              Complete control over departments, users, analytics, 
              and system configuration.
            </p>

            <ul className="text-sm text-gray-500 text-left mb-8 space-y-2">
              <li>✔ Department Overview</li>
              <li>✔ Production Analytics</li>
              <li>✔ Role-Based Access Control</li>
              <li>✔ System Configuration</li>
            </ul>

            <Link href="/admin/loginadmin">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full hover:bg-blue-700 transition">
                Admin Login
              </button>
            </Link>
          </div>

          {/* HR */}
          <div className="bg-white shadow-2xl rounded-2xl p-10 w-full md:w-96 text-center hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              HR Dashboard
            </h3>

            <p className="text-gray-600 mb-6">
              Manage attendance, employee records, leave approvals,
              and performance tracking.
            </p>

            <ul className="text-sm text-gray-500 text-left mb-8 space-y-2">
              <li>✔ Attendance Reports</li>
              <li>✔ Leave Management</li>
              <li>✔ Performance Insights</li>
              <li>✔ Employee Records</li>
            </ul>

            <Link href="/hr/hrlogin">
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl w-full hover:bg-green-700 transition">
                HR Login
              </button>
            </Link>
          </div>

          {/* Employee */}
          <div className="bg-white shadow-2xl rounded-2xl p-10 w-full md:w-96 text-center hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Employee Portal
            </h3>

            <p className="text-gray-600 mb-6">
              Track your attendance, update production batches,
              and monitor your performance metrics.
            </p>

            <ul className="text-sm text-gray-500 text-left mb-8 space-y-2">
              <li>✔ Daily Production Updates</li>
              <li>✔ Attendance View</li>
              <li>✔ Performance Summary</li>
              <li>✔ Notifications</li>
            </ul>

            <Link href="/employee/employee-login">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl w-full hover:bg-purple-700 transition">
                Employee Login
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-14">
          How The System Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

          <div className="p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="font-bold text-lg mb-3">1️⃣ Data Entry</h4>
            <p className="text-gray-600 text-sm">
              Employees update production batches and attendance in real-time.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="font-bold text-lg mb-3">2️⃣ Live Sync</h4>
            <p className="text-gray-600 text-sm">
              Data syncs instantly across departments without manual refresh.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <h4 className="font-bold text-lg mb-3">3️⃣ Analytics & Insights</h4>
            <p className="text-gray-600 text-sm">
              Admin and HR get detailed reports and productivity insights.
            </p>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          Trusted Workforce Monitoring
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold">99%</h3>
            <p className="opacity-90">System Reliability</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="opacity-90">Monitoring Capability</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="opacity-90">Employee Scalability</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Workforce?
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Improve productivity, track performance, and manage operations 
          efficiently with our intelligent monitoring system.
        </p>

        <Link href="/admin/loginadmin">
          <button className="bg-[#1e426d] text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition">
            Start Now
          </button>
        </Link>
      </section>

    </main>
  );
}
