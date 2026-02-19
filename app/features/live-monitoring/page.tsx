import Link from "next/link";

export default function LiveMonitoring() {
  return (
    <div className="pt-28">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#eaf2fc] to-[#f7fbff] px-6 lg:px-24 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e426d]">
          Real-Time Live Monitoring
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Track production batches, attendance, and department activities
          instantly across the entire organization. Stay informed with
          live data synchronization and centralized dashboards.
        </p>

        <Link href="/get-started">
          <button className="mt-8 bg-[#2766c5] text-white px-10 py-3 rounded-full hover:bg-blue-700 transition">
            Start Monitoring Now
          </button>
        </Link>
      </section>


      {/* Core Monitoring Features */}
      <section className="px-6 lg:px-24 py-20 grid md:grid-cols-3 gap-10">

        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[#1e426d]">
            Instant Batch Updates
          </h3>
          <p className="mt-4 text-gray-600">
            Every time a production batch is added, it instantly reflects
            in Maintenance, Sales, and Quality dashboards without delay.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[#1e426d]">
            Live Attendance Tracking
          </h3>
          <p className="mt-4 text-gray-600">
            Monitor employee check-ins and shift completion in real-time
            with automated time logging.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[#1e426d]">
            Department Synchronization
          </h3>
          <p className="mt-4 text-gray-600">
            All departments stay connected with automatic data flow and
            centralized visibility.
          </p>
        </div>

      </section>


      {/* Real-Time Dashboard Explanation */}
      <section className="bg-[#f4f8ff] px-6 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold text-[#1e426d]">
              Centralized Live Dashboard
            </h2>
            <p className="mt-6 text-gray-600 text-lg">
              Admin and HR can monitor all department activities in a single,
              unified dashboard. Production targets, completed batches,
              pending maintenance tasks, and sales status are updated
              automatically.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
              <li>✔ Real-time production progress</li>
              <li>✔ Completed vs Target tracking</li>
              <li>✔ Batch movement visibility</li>
              <li>✔ Performance insights</li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Example Dashboard Metrics
            </h3>
            <p className="mt-6 text-gray-600">
              • Total Batches Produced Today: 45  
              <br />
              • Target Completion: 90%  
              <br />
              • Active Employees: 12  
              <br />
              • Pending Maintenance: 3
            </p>
          </div>

        </div>
      </section>


      {/* Benefits Section */}
      <section className="px-6 lg:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1e426d]">
          Why Live Monitoring Matters?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Faster Decisions
            </h3>
            <p className="mt-4 text-gray-600">
              Make real-time business decisions based on up-to-date data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Improved Accountability
            </h3>
            <p className="mt-4 text-gray-600">
              Employees and departments stay accountable with transparent tracking.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Higher Productivity
            </h3>
            <p className="mt-4 text-gray-600">
              Monitor bottlenecks and optimize workflow efficiency instantly.
            </p>
          </div>

        </div>
      </section>


      {/* Final CTA Section */}
      <section className="bg-[#1e426d] py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Experience Real-Time Workforce Intelligence
        </h2>

        <p className="mt-6 text-lg text-gray-200">
          Transform your employee monitoring into a smart, connected ecosystem.
        </p>

        <Link href="/get-started">
          <button className="mt-8 bg-white text-[#1e426d] px-10 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Get Started Today
          </button>
        </Link>
      </section>

    </div>
  );
}
