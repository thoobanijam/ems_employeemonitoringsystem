export default function EnterprisePricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Enterprise Plan
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Complete workforce intelligence platform for large-scale organizations.
        </p>
      </section>

      {/* Custom Pricing Card */}
      <section className="py-20 px-6 flex justify-center">
        <div className="bg-white shadow-2xl rounded-xl p-12 max-w-lg w-full text-center border-2 border-black">
          <h2 className="text-3xl font-bold mb-4">
            Custom Pricing
          </h2>
          <p className="text-gray-600 mb-8">
            Tailored solutions for 100+ employees and multi-location operations.
          </p>

          <ul className="text-left space-y-4 mb-10">
            <li>✔ Everything in Pro</li>
            <li>✔ Unlimited Employees</li>
            <li>✔ Multi-Branch Dashboard</li>
            <li>✔ Role-Based Access Control</li>
            <li>✔ Dedicated Account Manager</li>
            <li>✔ 24/7 Priority Support</li>
            <li>✔ Custom Feature Development</li>
          </ul>

          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Enterprise Info */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6">
          Built for Large Enterprises
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Our Enterprise plan provides deep analytics, centralized control,
          advanced security, and seamless integration across departments 
          including Production, Maintenance, Sales, and Quality Control.
        </p>
      </section>

    </main>
  );
}
