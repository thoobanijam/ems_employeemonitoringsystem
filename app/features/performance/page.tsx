import Link from "next/link";

export default function Performance() {
  return (
    <div className="pt-28">

      <section className="text-center px-6 lg:px-24 py-16 bg-[#f4f8ff]">
        <h1 className="text-4xl font-bold text-[#1e426d]">
          Advanced Performance Reports
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Analyze employee productivity, production targets, and department
          performance with intelligent reporting tools.
        </p>
      </section>

      <section className="px-6 lg:px-24 py-16 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-[#1e426d]">
            Production Tracking
          </h3>
          <p className="mt-4 text-gray-600">
            Track completed batches and daily production targets.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-[#1e426d]">
            Sales Performance
          </h3>
          <p className="mt-4 text-gray-600">
            Monitor sales data and product movement across departments.
          </p>
        </div>
      </section>

      <section className="text-center py-16 bg-[#eaf2fc]">
        <h2 className="text-3xl font-bold text-[#1e426d]">
          Make Data-Driven Decisions
        </h2>
        <Link href="/pricing/pro">
          <button className="mt-6 bg-[#2766c5] text-white px-8 py-3 rounded-full">
            View Pro Plan
          </button>
        </Link>
      </section>

    </div>
  );
}
