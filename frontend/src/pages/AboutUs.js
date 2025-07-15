import { Logo } from "../components/Icons";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Header Section */}
      <section
        className="relative bg-cover bg-center h-[40rem] flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ backgroundImage: "url('/static/Images/About.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-60"></div>
        <div className="relative z-10 p-8 max-w-5xl mx-4 sm:mx-8 lg:mx-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            {" "}
            CoolCuts
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-6">
            Where Precision Meets Perfection
          </p>
          <p className="text-base sm:text-lg text-gray-300">
            Welcome to our barbershop! We have been serving our community with
            top-notch grooming services for over a decade. Our mission is to
            provide exceptional haircuts and grooming experiences in a friendly
            and professional environment.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-10 flex justify-center items-center">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="w-full sm:w-60 text-center">
              <img
                src="/static/Images/barber.png"
                alt="John Doe"
                className="rounded-full w-40 h-40 mx-auto shadow-lg transition-transform transform hover:scale-105"
              />
              <h3 className="text-xl mt-4 font-medium">John Doe</h3>
              <p className="text-gray-600">Master Barber</p>
            </div>
            <div className="w-full sm:w-60 text-center">
              <img
                src="/static/Images/Barbar1.png"
                alt="Jane Smith"
                className="rounded-full w-40 h-40 mx-auto shadow-lg transition-transform transform hover:scale-105"
              />
              <h3 className="text-xl mt-4 font-medium">Jane Smith</h3>
              <p className="text-gray-600">Senior Stylist</p>
            </div>
            <div className="w-full sm:w-60 text-center">
              <img
                src="/static/Images/Barber2.png"
                alt="Mike Johnson"
                className="rounded-full w-40 h-40 mx-auto shadow-lg transition-transform transform hover:scale-105"
              />
              <h3 className="text-xl mt-4 font-medium">Mike Johnson</h3>
              <p className="text-gray-600">Color Specialist</p>
            </div>
            <div className="w-full sm:w-60 text-center">
              <img
                src="/static/Images/Barber3.jpg"
                alt="Sarah Lee"
                className="rounded-full w-40 h-40 mx-auto shadow-lg transition-transform transform hover:scale-105"
              />
              <h3 className="text-xl mt-4 font-medium">Sarah Lee</h3>
              <p className="text-gray-600">Scalp Treatment Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-100">
        <div className="max-w-4xl mx-auto lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src="/static/Images/Boss.webp"
                alt="Alex Johnson"
                className="rounded-full w-48 h-48 mx-auto shadow-lg lg:w-64 lg:h-64"
              />
              <h3 className="text-xl mt-4 font-medium text-center lg:text-left">
                Alex Johnson
              </h3>
              <p className="text-gray-600 text-center">Founder @CoolCuts</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl mt-4 font-medium">About Owner</h3>
              <p className="text-gray-600 mt-4">
                Alex founded the barbershop with a vision to create a space
                where customers can enjoy top-notch grooming services in a
                friendly and professional environment. With over 20 years of
                experience in the industry, Alex is passionate about delivering
                exceptional service and building lasting relationships with
                clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* footer Section */}
      <footer className="bg-gray-900 text-gray-300 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center"
          >
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

export default AboutUs;
