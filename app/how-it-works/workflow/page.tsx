import Link from "next/link";

export default function Workflow() {
  return (
    <div className="pt-28">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#eaf2fc] to-[#f8fbff] text-center px-6 lg:px-24 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e426d]">
          How Our Employee Monitoring System Works
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          A structured workflow connecting Production, HR, Sales,
          Maintenance, and Quality Control into one synchronized system.
        </p>
      </section>


      {/* Workflow Timeline */}
      <section className="px-6 lg:px-24 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e426d] mb-16">
          Step-by-Step Workflow
        </h2>

        <div className="space-y-12 max-w-5xl mx-auto">

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Step 1: Employee Input
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Employees in the Production department enter daily batch numbers,
              manufacturing dates, and completed quantities. Attendance is also
              recorded automatically.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Step 2: Real-Time Synchronization
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Once submitted, data instantly syncs across all related dashboards.
              HR sees attendance, Maintenance sees pending batches,
              Sales tracks product movement, and Quality reviews production data.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Step 3: Department Monitoring
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Each department works independently while staying connected
              through shared live data updates.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Step 4: Admin Oversight & Reporting
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              The Admin dashboard aggregates all data into visual reports,
              production target tracking, and department performance analytics.
            </p>
          </div>

        </div>
      </section>


      {/* Department Flow Section */}
      <section className="bg-[#f4f8ff] px-6 lg:px-24 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e426d] mb-14">
          Department Workflow Integration
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Production
            </h3>
            <p className="mt-4 text-gray-600">
              Adds batch numbers and updates daily production targets.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Maintenance
            </h3>
            <p className="mt-4 text-gray-600">
              Tracks pending batches requiring maintenance or inspection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Sales
            </h3>
            <p className="mt-4 text-gray-600">
              Monitors completed production ready for distribution.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              HR
            </h3>
            <p className="mt-4 text-gray-600">
              Monitors employee attendance and work hours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Quality Control
            </h3>
            <p className="mt-4 text-gray-600">
              Verifies production quality and batch standards.
            </p>
          </div>

        </div>
      </section>


      {/* Real Example Scenario */}
      <section className="px-6 lg:px-24 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e426d] mb-12">
          Real Workflow Example
        </h2>

        <div className="bg-white p-12 rounded-3xl shadow-lg max-w-4xl mx-auto text-gray-600 text-lg">
          <p>
            Suppose Production completes 45 batches today.
            The system automatically updates:
          </p>

          <ul className="mt-6 space-y-3">
            <li>✔ Admin Dashboard → Target Completion: 90%</li>
            <li>✔ Maintenance → 3 Pending Batches</li>
            <li>✔ Sales → 42 Ready for Dispatch</li>
            <li>✔ HR → 12 Active Employees Logged In</li>
          </ul>

          <p className="mt-6">
            No manual reporting required. Everything updates instantly.
          </p>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="bg-[#eaf2fc] px-6 lg:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1e426d]">
          Why This Workflow Is Powerful
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Transparency
            </h3>
            <p className="mt-4 text-gray-600">
              Every department sees accurate live data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Efficiency
            </h3>
            <p className="mt-4 text-gray-600">
              Eliminates manual reporting and delays.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Productivity
            </h3>
            <p className="mt-4 text-gray-600">
              Identifies bottlenecks and improves performance.
            </p>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#1e426d] text-white text-center py-20">
        <h2 className="text-3xl font-bold">
          Experience Seamless Department Integration
        </h2>

        <p className="mt-6 text-lg text-gray-200">
          Connect your entire organization with real-time workflow monitoring.
        </p>

        <Link href="/get-started">
          <button className="mt-8 bg-white text-[#1e426d] px-10 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </Link>
      </section>

    </div>
  );
}
