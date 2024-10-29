import React from "react";
import { Link } from "react-router-dom";
import { HairCuttingIcon, BeardShavingIcon, HairColouringIcon, HairStylingIcon, FacialTreatmentsIcon, ScalpTreatmentIcon, Logo } from "./Icons"; 
import '../styles/styles.css';


const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/Images/home.jpg')",
          paddingTop: "5rem",
          paddingBottom: "5rem" 
        }}
      >
        <div  className="flex flex-col justify-center items-center h-full text-center text-white py-24 px-4 sm:px-8">
  <h1   style={{
    fontSize: '2.5rem', 
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: '1.5rem', 
    fontFamily: "'Montserrat', sans-serif"
  }} className="text-4xl sm:text-6xl font-bold tracking-tight italic mb-6">
    Your hair is your best accessory
  </h1>
  <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mb-8">
  At CoolCuts , we show your skin, hair, and body the care and attention they deserve. Your hair reflects your personality, and our professionals are here to enhance your unique style. Book now and let us cut, shave, and color your hair to perfectly complement your facial features.
  </p>
  <Link
    to="/book-appointment"
    className="bg-teal-700 text-white py-3 px-8 rounded-lg text-lg mt-8 inline-block transition duration-300 ease-in-out transform hover:bg-teal-600 hover:scale-105 shadow-lg"
  >
    Book Appointment
  </Link>
</div>

      </section>

      {/* Services Section */}
      <section className="text-gray-600 body-font bg-gray-100 py-16">
        <div className="container px-5 mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-16">Our Services</h2>
          <div className="flex flex-wrap -m-4">
            {/* Service Cards */}
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="text-gray-600 body-font py-24 bg-gray-200">
        <div className="container px-5 mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-16">Photo Gallery</h2>
          <div className="flex flex-wrap -m-4">
            {/* Gallery Images */}
            {galleryImages.map((image, index) => (
              <div key={index} className="p-4 md:w-1/4">
                <img
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover object-center rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white body-font py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg mb-0 leading-relaxed">
            Book your appointment now and experience our professional services.
          </p>
          <Link
            to="/book-appointment"
            className="bg-teal-700 text-white py-3 px-8 rounded-lg text-lg mt-8 inline-block transition duration-300 ease-in-out transform hover:bg-teal-600 hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
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
              className="text-gray-400 ml-1 hover:text-gray-100"
              rel="noopener noreferrer"
              target="_blank"
            >
              @CoolCuts
            </a>
          </p>
          <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {socialLinks.map((social, index) => (
              
              <SocialIcon key={index} link={social.link} icon={social.icon} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

// Example service data
const services = [
  {
    icon: <HairCuttingIcon />,
    title: "Hair Cutting",
    description: "Shaping and styling hair to achieve desired looks and textures."
  },
  {
    icon: <BeardShavingIcon />,
    title: "Beard Shaving/Trimming",
    description: "Trimming and shaping facial hair to maintain a desired length and style."
  },
  {
    icon: <HairColouringIcon />,
    title: "Hair Colouring",
    description: "Changing the hair's color using various dyes to achieve a desired look or cover gray hairs."
  },
  {
    icon: <HairStylingIcon />,
    title: "Hair Styling",
    description: "Styling hair for special occasions or daily wear."
  },
  {
    icon: <FacialTreatmentsIcon />,
    title: "Facial Treatments",
    description: "Skin care treatments such as facial cleansing, exfoliation, and moisturizing."
  },
  {
    icon: <ScalpTreatmentIcon />,
    title: "Scalp Treatments",
    description: "Treatments aimed at improving scalp health and hair growth."
  }
];

// Example gallery images
const galleryImages = [
  "https://th.bing.com/th/id/OIP.Uiv67eFiyZAoO6YES6HBiwAAAA?rs=1&pid=ImgDetMain",
  "https://i2.wp.com/www.hairstyle.org.in/wp-content/uploads/2017/04/Curly-Hairstyle-For-Men-In-2019.jpg?fit=629%2C955&ssl=1",
  "https://th.bing.com/th/id/R.25e40d99c141045355f0c549014d6adb?rik=Ai3d3Ao86ESZmQ&riu=http%3a%2f%2fcoolmenshair.com%2fwp-content%2fuploads%2ffaux-hawk-hairstyle-3.jpg&ehk=LKFUrBkT7cixYfktFrqSSqzOoIWub4%2biAZcpm2%2biEg0%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/R.3f9dd672c41c481d7a01dce3f6174260?rik=j5MQ%2b4kTlOGdFA&riu=http%3a%2f%2fwww.mens-hairstyle.com%2fwp-content%2fuploads%2f2017%2f05%2fBest-Hairstyle-for-Men.jpg&ehk=kmc5%2fWhiyh4IquyKFzUqX6x1iqG0ZU8hXbuAzoz5Cao%3d&risl=&pid=ImgRaw&r=0"
];

// Example social media links
const socialLinks = [
  {
    link: "https://www.facebook.com/",
    icon: (
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
    )
  },
  {
    link: "https://x.com/?lang=en-in",
    icon: (
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
    )
  },
  {
    link: "https://www.instagram.com/?hl=en",
    icon: (
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
    )
  },
  {
    link: "https://in.linkedin.com/",
    icon: (
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
    )
  }
];

// ServiceCard component for rendering each service
const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 lg:w-1/3 md:w-1/2">
      <div className="h-full bg-white shadow-sm rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            {service.icon}
          </div>
          <h2 className="service-heading text-lg tracking-widest font-semibold text-gray-900 mb-3">
            {service.title}
          </h2>
          <p className="leading-relaxed text-base text-gray-700 mb-3">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};


// SocialIcon component for rendering each social media icon
const SocialIcon = ({ link, icon }) => {
  return (
    <a
      href={link}
      className="text-gray-400 hover:text-gray-100 ml-4 transition duration-300 ease-in-out transform hover:scale-105"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default Home;
