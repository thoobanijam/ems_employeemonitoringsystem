export default function BasicPricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Basic Plan
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Perfect for small teams and startups looking to digitize attendance 
          and employee tracking with essential features.
        </p>
      </section>

      {/* Pricing Card */}
      <section className="py-16 px-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">₹999 / month</h2>
          <p className="text-gray-600 mb-8">
            Ideal for businesses with up to 25 employees.
          </p>

          <ul className="text-left space-y-4 mb-8">
            <li>✔ Attendance Management</li>
            <li>✔ Daily Production Tracking</li>
            <li>✔ Basic Dashboard Analytics</li>
            <li>✔ Manual Batch Entry</li>
            <li>✔ Email Support</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Extra Info */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6">
          Who is this for?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The Basic plan is designed for small manufacturing units, 
          retail shops, and startups that need structured employee monitoring 
          without complex integrations.
        </p>
      </section>

    </main>
  );
}
