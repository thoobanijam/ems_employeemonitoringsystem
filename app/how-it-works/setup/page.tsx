import Link from "next/link";

export default function Setup() {
  return (
    <div className="pt-28">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#eaf2fc] to-[#f7fbff] px-6 lg:px-24 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e426d]">
          System Setup Made Simple
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Get your Employee Monitoring System up and running in minutes.
          Configure departments, assign roles, and define production targets
          with a structured and secure setup process.
        </p>
      </section>


      {/* Overview Section */}
      <section className="px-6 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-bold text-[#1e426d]">
              Centralized Configuration
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              The Admin dashboard acts as the control center of your system.
              From here, you can configure departments, create employee accounts,
              and set production targets based on business requirements.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
              <li>✔ Department Creation</li>
              <li>✔ Employee Account Setup</li>
              <li>✔ Production Target Assignment</li>
              <li>✔ Dashboard Initialization</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg p-10 rounded-3xl text-center">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Setup Time
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Average complete configuration time:
            </p>
            <p className="mt-4 text-3xl font-bold text-[#2766c5]">
              10 – 20 Minutes
            </p>
          </div>

        </div>
      </section>


      {/* Step-by-Step Setup */}
      <section className="bg-[#f4f8ff] px-6 lg:px-24 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e426d]">
          Step-by-Step Setup Process
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Step 1: Create Departments
            </h3>
            <p className="mt-4 text-gray-600">
              Add departments such as Production, HR, Sales, Maintenance,
              and Quality Control.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Step 2: Add Employees
            </h3>
            <p className="mt-4 text-gray-600">
              Register employees and assign them to specific departments
              with defined access roles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#1e426d]">
              Step 3: Define Targets
            </h3>
            <p className="mt-4 text-gray-600">
              Set daily or weekly production targets and monitoring parameters.
            </p>
          </div>

        </div>
      </section>


      {/* Role & Permission Section */}
      <section className="px-6 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#1e426d]">
              Role-Based Access Control
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li><strong>Admin:</strong> Full system control</li>
              <li><strong>HR:</strong> Attendance & employee records</li>
              <li><strong>Production:</strong> Batch updates</li>
              <li><strong>Sales:</strong> Sales tracking</li>
              <li><strong>Maintenance:</strong> Equipment & pending batches</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#1e426d]">
              Secure & Structured Access
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Each role has controlled access permissions ensuring data security
              and structured workflow management across departments.
            </p>
          </div>

        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-[#1e426d] py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Configure Your System?
        </h2>

        <p className="mt-6 text-lg text-gray-200">
          Start your setup process today and experience seamless employee monitoring.
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
