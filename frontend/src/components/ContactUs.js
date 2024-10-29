import React, { useState } from 'react';
import axios from 'axios';
import { Logo } from './Icons.js';
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/contact/', formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div>
      <div className="bg-gray-100 py-16 mt-2">
        <section className="text-gray-600 body-font relative">
          {/* Map Section */}
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-0 mb-10">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.31046867370605%2C28.36864961375766%2C77.31487131118774%2C28.370875112207376&amp;layer=mapnik&amp;marker=28.369812643000717%2C77.31266984556756"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </div>

          {/* Contact Details and Form */}
          <div className="container ">
            <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row">
              {/* Contact Details */}
              <div className="lg:w-1/2 w-full lg:pr-6 mb-6 lg:mb-0">
                <h2 className="text-gray-900 text-3xl mb-4 font-bold title-font">
                  Get in Touch
                </h2>
                <p className="leading-relaxed mb-6 text-gray-600 text-lg">
                  We’d love to hear from you! Whether you have a question, comment, or just want to say hi, fill out the form below or use the contact information provided.
                </p>
                <div className="mb-6">
                  <div className="relative mb-4">
                    <label htmlFor="address" className="leading-7 text-md text-gray-700 font-semibold">
                      Address
                    </label>
                    <p className="mt-1 text-gray-900 text-lg">
                      123 Barber Lane, Suite 100<br />
                      Hairtown, HT 54321<br />
                      USA<br />
                    </p>
                  </div>

                  <div className="relative mb-4">
                    <label htmlFor="email-info" className="leading-7 text-md text-gray-700 font-semibold">
                      Email  &nbsp;
                    </label>
                    <a href="mailto:example@email.com" className="text-teal-600 hover:underline text-lg">
                      example@email.com
                    </a>
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="phone" className="leading-7 text-md text-gray-700 font-semibold">
                      Phone
                    </label>
                    <p className="leading-relaxed text-gray-900 text-lg">123-456-7890</p>
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="hours" className="leading-7 text-md text-gray-700 font-semibold">
                      Working Hours
                    </label>
                    <p className="leading-relaxed text-gray-900 text-lg">
                      Mon-Fri : 10 AM - 6 PM<br />
                      Sat-Sun : 9 AM - 8 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-1/2 w-full">
                <h2 className="text-gray-900 text-3xl mb-6 font-bold title-font">Contact Form</h2>
                <form onSubmit={handleSubmit}>
                  <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-md text-gray-700 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-12 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-md text-gray-700 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-12 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="subject" className="leading-7 text-md text-gray-700 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-12 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-6">
                    <label htmlFor="message" className="leading-7 text-md text-gray-700 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-40 text-base outline-none text-gray-700 py-3 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  <button type="submit" className="text-white bg-teal-600 border-0 py-3 px-6 focus:outline-none hover:bg-teal-700 rounded text-lg font-semibold transition-colors duration-300 ease-in-out">
                    Send Message
                  </button>
                  {status && (
                    <p className={`mt-4 text-lg ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {status.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
      <footer className="bg-gray-900 text-gray-300 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center">
            <Logo />
            <span className="ml-3 text-xl pt-3">Salon</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
            © 2024 Salon —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-400 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @CoolCuts
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/?lang=en-in"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://in.linkedin.com/"
              className="text-gray-400 hover:text-gray-100 ml-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>

    </div>

  );
};

export default ContactUs;
