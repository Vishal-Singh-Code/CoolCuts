import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Modal from './Modal';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/appointments/', {
          params: { user_id: user.id } // Assuming you can pass user ID as a query parameter
        });
        // Sort appointments by booking_time in descending order
        const sortedAppointments = response.data.sort((a, b) => new Date(b.booking_time) - new Date(a.booking_time));
        setAppointments(sortedAppointments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading appointments: {error.message}</p>;

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Capitalize the first letter of each word in the name
  const capitalizeName = (name) => {
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format the appointment date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format the booking time
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='mt-16 p-4'>
      <h1 className='text-3xl font-bold text-center mb-4'>My Appointments</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {appointments.map(appointment => (
          <li key={appointment.id} className='text-lg p-4 bg-gray-100 rounded-lg shadow-md'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-lg md:text-xl font-semibold mr-4'>{capitalizeName(appointment.customer_name)}</p>
                <p className='text-sm md:text-base pt-2 text-gray-600'>{formatDateTime(appointment.booking_time)}</p>
              </div>
              <button
                onClick={() => handleViewDetails(appointment)}
                className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedAppointment && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <p><strong>Customer:</strong> {capitalizeName(selectedAppointment.customer_name)}</p>
          <p><strong>Date:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
          <p><strong>Time:</strong> {selectedAppointment.appointment_time}</p>
          {/* <p><strong>Booking Time:</strong> {formatDateTime(selectedAppointment.booking_time)}</p> */}
          <p><strong>Status:</strong> {selectedAppointment.status}</p>
          <p><strong>Checklist:</strong></p>
          <ul className='list-disc pl-5'>
            {selectedAppointment.checklist.map((item, index) => (
              <li key={index}>{item.text.name}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default MyAppointment;
