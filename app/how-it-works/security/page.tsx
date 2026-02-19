import Link from "next/link";

export default function Security() {
  return (
    <div className="pt-28">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#eaf2fc] to-[#f8fbff] text-center px-6 lg:px-24 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e426d]">
          Enterprise-Grade Security
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Protecting employee data, production records, and department workflows
          with structured access control and secure system architecture.
        </p>
      </section>


      {/* Security Overview */}
      <section className="px-6 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold text-[#1e426d]">
              Secure System Architecture
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Our Employee Monitoring System is designed with security at its core.
              Every user action is role-based and controlled to ensure
              safe data handling across departments.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
              <li>✔ Structured authentication system</li>
              <li>✔ Role-based permissions</li>
              <li>✔ Secure data handling</li>
              <li>✔ Controlled dashboard access</li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Security Layers
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Application Layer  
              <br />
              Access Control Layer  
              <br />
              Data Validation Layer  
              <br />
              Role Authorization Layer
            </p>
          </div>

        </div>
      </section>


      {/* Role-Based Access */}
      <section className="bg-[#f4f8ff] px-6 lg:px-24 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e426d] mb-14">
          Role-Based Access Control (RBAC)
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Admin
            </h3>
            <p className="mt-4 text-gray-600">
              Full system control including employee management,
              department configuration, and reporting access.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              HR & Department Heads
            </h3>
            <p className="mt-4 text-gray-600">
              Access limited to attendance records and department-specific
              dashboards only.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Employees
            </h3>
            <p className="mt-4 text-gray-600">
              Can update their own production data and attendance
              without access to confidential reports.
            </p>
          </div>

        </div>
      </section>


      {/* Data Protection Section */}
      <section className="px-6 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Data Integrity & Protection
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li>✔ Validated input fields</li>
              <li>✔ Controlled batch number entries</li>
              <li>✔ Automatic synchronization logs</li>
              <li>✔ Secure session management</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#1e426d]">
              Protecting Business Data
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              All production and employee information remains structured,
              preventing unauthorized modifications or accidental data loss.
              The system ensures accuracy and accountability.
            </p>
          </div>

        </div>
      </section>


      {/* Reliability Section */}
      <section className="bg-[#eaf2fc] px-6 lg:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1e426d]">
          Reliable & Transparent Monitoring
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Real-Time Logging
            </h3>
            <p className="mt-4 text-gray-600">
              Every update is reflected instantly across dashboards.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Audit-Friendly Structure
            </h3>
            <p className="mt-4 text-gray-600">
              Clear tracking of production and attendance activities.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Scalable Architecture
            </h3>
            <p className="mt-4 text-gray-600">
              Designed to grow securely with your organization.
            </p>
          </div>

        </div>
      </section>


      {/* Final CTA */}
      <section className="bg-[#1e426d] text-white text-center py-20">
        <h2 className="text-3xl font-bold">
          Secure Your Workforce Monitoring Today
        </h2>

        <p className="mt-6 text-lg text-gray-200">
          Experience safe, structured, and intelligent employee monitoring.
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
