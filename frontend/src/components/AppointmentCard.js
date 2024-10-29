import React from 'react';
import AppointmentChecklist from './AppointmentChecklist';

const AppointmentCard = ({ appointment, toggleAppointmentStatus, toggleChecklistItemStatus }) => {
    const formatTime = (timeString) => {
        const time = new Date(`1970-01-01T${timeString}`);
        return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <li className="text-lg bg-gray-100 border border-gray-300 mb-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
            {/* Button Container */}
            <div className="absolute top-2 right-2">
                <button
                    className={`p-2 border border-gray-300 rounded-md ${appointment.status === 'done' ? 'bg-green-300 hover:bg-green-400' : 'bg-yellow-300 hover:bg-yellow-400'}`}
                    onClick={() => toggleAppointmentStatus(appointment.id)}
                >
                    {appointment.status === 'done' ? 'Done' : 'Pending'}
                </button>
            </div>

            {/* Appointment Details */}
            <p className="font-semibold">Customer : <span className="text-gray-700">{capitalizeName(appointment.customer_name)}</span></p>
            <p className="font-semibold">Date : <span className="text-gray-700">{formatDate(appointment.appointment_date)}</span></p>
            <p className="font-semibold">Time : <span className="text-gray-700">{formatTime(appointment.appointment_time)}</span></p>

            {/* Checklist */}
            <AppointmentChecklist appointment={appointment} toggleChecklistItemStatus={toggleChecklistItemStatus} />
        </li>
    );
};

export default AppointmentCard;
