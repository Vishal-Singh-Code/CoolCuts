import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Logo } from '../components/Icons';
import '../styles/styles.css';

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services/');
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font bg-white">
        <div className="mb-12 mt-16">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img
                  src="https://i.pinimg.com/736x/4a/76/0c/4a760c9f098e6ffbc502f32d34c0f20b.jpg"
                  className="d-block w-full object-cover object-center"
                  alt="Haircut 1"
                />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img
                  src="https://im.whatshot.in/img/2021/Jul/istock-872361244-cropped-1624514729-1626177802.jpg"
                  className="d-block w-full object-cover object-center"
                  alt="Haircut 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://st3.depositphotos.com/12039320/16154/i/450/depositphotos_161544120-stock-photo-hairstylist-washing-clients-hair.jpg"
                  className="d-block w-full object-cover object-center"
                  alt="Haircut 3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="text-center mb-8 px-4">
          <h1 className="sm:text-4xl text-3xl font-semibold title-font text-gray-900 mb-4">
            Services List
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            A service list outlines available offerings, detailing services
            and prices provided by a business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner-border text-teal-500" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">Failed to load services. Please try again later.</p>
          ) : (
            services.map(service => (
              <div className="p-4" key={service.id}>
                <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {service.name}
                    </h2>
                    <p className="text-lg text-gray-600 font-semibold">
                      Rs {service.price}
                    </p>
                  </div>
                </div>


              </div>
            ))
          )}
        </div>
      </section>

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

export default Service;
