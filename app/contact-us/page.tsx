import React from "react";

const ContactUsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-[#4a609b] pt-28 px-6 ">

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center bg-white shadow-lg rounded-3xl p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in Touch With Us
        </h1>
        <p className="text-lg mb-6">
          Have questions or need assistance? Our team is here to help you optimize workforce monitoring, attendance, and productivity tracking.
        </p>
        <p className="text-sm mb-6">
          Fill out the form below, and we’ll respond as quickly as possible. Or reach us directly via email or phone.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-5xl mx-auto mt-16 bg-white p-12 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Form</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-[#4a609b]"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-[#4a609b]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-[#4a609b] md:col-span-2"
          />
          <textarea
            placeholder="Your Message"
            className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a609b] text-[#4a609b] md:col-span-2 h-40"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-[#eb722e] via-[#fa973b] to-[#f59237]
                       hover:from-[#ffcd03] hover:via-[#ffb703] hover:to-[#ffa200]
                       text-white font-semibold px-12 py-3 rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info */}
      <section className="max-w-5xl mx-auto mt-16 bg-white p-12 rounded-3xl shadow-lg text-center space-y-6">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <p className="text-[#4a609b] text-lg">Email: support@workmonitor.com</p>
        <p className="text-[#4a609b] text-lg">Phone: +1 (555) 123-4567</p>
        <p className="text-[#4a609b] text-lg">Address: 123 Workforce Ave, Suite 100, City, Country</p>
      </section>

      {/* Map / Location Placeholder */}
      <section className="max-w-5xl mx-auto mt-16 bg-white p-12 rounded-3xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Our Location</h2>
        <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-[#4a609b] text-lg">[Map Placeholder]</p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
        <p className="text-[#4a609b] mb-8">
          Reach out today and our expert team will assist you promptly.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-5">
          <button className="bg-gradient-to-r from-[#eb722e] via-[#fa973b] to-[#f59237]
                             hover:from-[#ffcd03] hover:via-[#ffb703] hover:to-[#ffa200]
                             text-white font-semibold px-12 py-3 rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl">
            Start
          </button>
          <button className="border px-12 py-3 rounded-3xl cursor-pointer
                             hover:bg-[#d9e9f6] text-[#4a609b] font-semibold
                             transition-all duration-300 shadow-md hover:shadow-lg">
            Contact Us
          </button>
        </div>
      </section>

    </main>
  );
};

export default ContactUsPage;
