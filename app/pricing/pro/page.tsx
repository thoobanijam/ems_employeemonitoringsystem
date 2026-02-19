export default function ProPricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero */}
      <section className="bg-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Pro Plan
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Advanced monitoring tools and automation for growing businesses.
        </p>
      </section>

      {/* Pricing Card */}
      <section className="py-16 px-6 flex justify-center">
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center border-2 border-purple-600">
          <h2 className="text-3xl font-bold mb-4">₹2,499 / month</h2>
          <p className="text-gray-600 mb-8">
            For businesses with up to 100 employees.
          </p>

          <ul className="text-left space-y-4 mb-8">
            <li>✔ Everything in Basic</li>
            <li>✔ Live Monitoring Dashboard</li>
            <li>✔ Auto Batch Sync Across Departments</li>
            <li>✔ Performance Analytics</li>
            <li>✔ Real-Time Notifications</li>
            <li>✔ Priority Email Support</li>
          </ul>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Upgrade to Pro
          </button>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-10">
          Why Choose Pro?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="font-bold mb-3">Real-Time Sync</h4>
            <p className="text-gray-600 text-sm">
              All departments see updates instantly without manual refresh.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="font-bold mb-3">Advanced Reports</h4>
            <p className="text-gray-600 text-sm">
              Get daily, weekly, and monthly performance insights.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="font-bold mb-3">Scalable</h4>
            <p className="text-gray-600 text-sm">
              Built for growing production and workforce expansion.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
