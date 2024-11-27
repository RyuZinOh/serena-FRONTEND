import React from "react";
import Layout from "../components/Layout/Layout";
import { FaEnvelope, FaPhoneAlt, FaLocationArrow } from "react-icons/fa"; // Contact related icons

const ContactPage: React.FC = () => {
  return (
    <Layout
      title="Contact Us - Serena"
      description="Get in touch with the Serena team for questions, feedback, or assistance. We're here to help!"
      author="Serena Team"
      keywords="Contact, Support, Feedback, Serena"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Contact Us
            </h1>
            <p className="text-gray-600 text-sm">
              Have questions or feedback? Reach out to us.
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500 text-lg" />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Email</h3>
                <p className="text-xs text-gray-600">yoyuehappy@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-500 text-lg" />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Phone</h3>
                <p className="text-xs text-gray-600">+977 98XXXXXXX</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaLocationArrow className="text-red-500 text-lg" />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Location
                </h3>
                <p className="text-xs text-gray-600">Nepal</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-gray-800 text-sm font-semibold"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your message here..."
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
