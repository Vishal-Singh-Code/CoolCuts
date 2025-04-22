import "../styles/styles.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BookingModal from "./BookingModal";
import getCookie from "../services/csrf";


const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [appointmentData, setAppointmentData] = useState({
    user: user ? user.id : "",
    customer_name: "",
    appointment_date: "",
    appointment_time: "",
    booking_date: "",
    checklist: [],
  });

  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (user) {
      setAppointmentData((prevData) => ({
        ...prevData,
        user: user.id,
      }));
    }
  }, [user]);

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9;
    const endHour = 18;
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        const time = new Date(0, 0, 0, hour, minute, 0);
        const formattedTime = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        times.push(formattedTime);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const handleChecklistChange = (service) => {
    setAppointmentData((prevData) => {
      const checklist = prevData.checklist.some((item) => item.text.id === service.id)
        ? prevData.checklist.filter((item) => item.text.id !== service.id)
        : [...prevData.checklist, { text: service, done: false }];
      return { ...prevData, checklist };
    });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(appointmentData.appointment_date);
    const selectedTime = new Date(`1970-01-01T${appointmentData.appointment_time}`);

    if (!appointmentData.customer_name) {
      setError("Customer name is required.");
      return;
    }

    if (!appointmentData.appointment_date) {
      setError("Appointment date is required.");
      return;
    }

    if (!appointmentData.appointment_time) {
      setError("Appointment time is required.");
      return;
    }

    if (
      selectedDate.toDateString() === currentDate.toDateString() &&
      selectedTime < new Date()
    ) {
      setError("Cannot book an appointment in the past time.");
      return;
    }

    if (appointmentData.checklist.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    if (!user) {
      setError("Please login to book an appointment");
      return;
    }

    axios
      .post("/api/appointments/", appointmentData, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        setAppointmentData({
          user: user ? user.id : "",
          customer_name: "",
          appointment_date: "",
          appointment_time: "",
          booking_date: "",
          checklist: [],
        });
        setError("");
        setIsModalOpen(true);
      })
      .catch((error) => {
        setError("Slot already filled!");
        console.error("Error booking appointment:", error);
      });
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          navigate("/");
          setIsModalOpen(false);
        }}
        message="Appointment has been booked successfully!"
      />

      <ul style={{ backgroundColor: "#121212" }} className="flex items-center justify-between bg-gray-800 p-3">
        <li>
          <button className="text-white text-xl flex items-center" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="fill-current">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M14.41 7.41L13 6l-6 6 6 6 1.41-1.41L9.83 12z" />
            </svg>
          </button>
        </li>
        <li>
          <Link to="/" className="text-white text-xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
            </svg>
          </Link>
        </li>
      </ul>

      <div className="bg-gray-200 p-4">
        <form className="mx-auto max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-black-400 mb-6">Book Appointment</h2>

          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-700 font-medium">
              Customer Name:
              <input
                type="text"
                className="form-input mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm px-3"
                id="customerName"
                placeholder="Enter your name"
                value={appointmentData.customer_name}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    customer_name: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="appointmentDate" className="block text-gray-700 font-medium">
              Date:
              <input
                type="date"
                className="form-input mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm px-3"
                id="appointmentDate"
                value={appointmentData.appointment_date}
                min={minDate}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    appointment_date: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="appointmentTime" className="block text-gray-700 font-medium">
              Time:
              <select
                className="custom-select mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm px-3"
                id="appointmentTime"
                value={appointmentData.appointment_time}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    appointment_time: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Time
                </option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4">
            <fieldset className="block">
              <legend className="block text-gray-700 font-medium">Select Services:</legend>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center custom-checkbox">
                    <input
                      type="checkbox"
                      id={service.id}
                      checked={appointmentData.checklist.some((item) => item.text.id === service.id)}
                      onChange={() => handleChecklistChange(service)}
                      className="form-checkbox text-teal-600 h-5 w-5 rounded"
                    />
                    <label htmlFor={service.id} className="ml-2 text-gray-700">
                      {service.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded w-full">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
