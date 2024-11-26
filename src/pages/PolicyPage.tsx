import React from "react";
import Layout from "../components/Layout/Layout";

const PolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              We value your privacy and strive to protect your personal data.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 text-sm">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              Welcome to our Privacy Policy page! Your privacy is of paramount
              importance to us. This policy outlines the types of information we
              collect, how we use it, and the steps we take to ensure your
              information is protected.
            </p>

            <h2 className="text-xl font-semibold">Information Collection</h2>
            <p>
              We collect personal information when you visit our website, sign
              up for our services, or interact with us through various forms.
              This information may include your name, email address, phone
              number, and other relevant details.
            </p>

            <h2 className="text-xl font-semibold">
              How We Use Your Information
            </h2>
            <p>
              The information we collect is used to enhance your experience on
              our site, improve our services, and communicate with you. We may
              use your information to send you updates, respond to inquiries, or
              provide customer support.
            </p>

            <h2 className="text-xl font-semibold">Data Protection</h2>
            <p>
              We implement security measures to safeguard your personal
              information from unauthorized access or disclosure. However, no
              method of transmission over the internet is 100% secure, so we
              cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold">Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience.
              Cookies are small files stored on your device that help us
              personalize your visit and track usage patterns.
            </p>

            <h2 className="text-xl font-semibold">
              Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update or change our privacy policy at any
              time. Any changes will be posted on this page, and we encourage
              you to review it regularly.
            </p>

            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about our privacy policy or how we
              handle your information, feel free to reach out to us at{" "}
              <strong>yoyuehappy@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
