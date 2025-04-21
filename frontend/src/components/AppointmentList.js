import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Filters from './Filters';
import AppointmentCard from './AppointmentCard';
import getCookie from '../services/csrf';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filter, setFilter] = useState({ search: '', sort: '', status: '' });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (user) {
                    const response = await axios.get('/api/appointments/', {
                        headers: {
                          "X-CSRFToken": getCookie("csrftoken"),
                        },
                        withCredentials: true,
                      });
                    setAppointments(response.data);
                    setFilteredAppointments(response.data);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [user]);

    useEffect(() => {
        applyFilters();
    }, [appointments, filter]);

    const applyFilters = () => {
        let filtered = [...appointments];

        // Filter by search term (customer name or date)
        if (filter.search) {
            filtered = filtered.filter(appointment =>
                appointment.customer_name.toLowerCase().includes(filter.search.toLowerCase()) ||
                appointment.appointment_date.includes(filter.search)
            );
        }

        // Sort by date
        if (filter.sort === 'oldest') {
            filtered.sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));
        } else if (filter.sort === 'newest') {
            filtered.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
        } else if (filter.sort === 'az') {
            filtered.sort((a, b) => a.customer_name.localeCompare(b.customer_name));
        } else if (filter.sort === 'za') {
            filtered.sort((a, b) => b.customer_name.localeCompare(a.customer_name));
        }

        // Filter by appointment status
        if (filter.status) {
            filtered = filtered.filter(appointment => appointment.status === filter.status);
        }

        setFilteredAppointments(filtered);
    };

    const resetFilters = () => {
        setFilter({ search: '', sort: '', status: '' });
    };

    const toggleChecklistItemStatus = async (appointmentId, itemIndex) => {
        try {
            const appointment = appointments.find(app => app.id === appointmentId);
            if (appointment) {
                const updatedChecklist = appointment.checklist.map((item, index) => {
                    if (index === itemIndex) {
                        return { ...item, done: !item.done };
                    }
                    return item;
                });



                const convertTo12HourFormat = (timeString) => {
                    const time = new Date(`1970-01-01T${timeString}`);
                    const hours = time.getHours();
                    const minutes = time.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const hours12 = hours % 12 || 12;
                    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
                    return `${hours12}:${minutesStr} ${ampm}`;
                };

                const formattedAppointmentTime = convertTo12HourFormat(appointment.appointment_time);

                const payload = {
                    ...appointment,
                    appointment_time: formattedAppointmentTime,
                    checklist: updatedChecklist,
                };

                const response = await axios.put(`/api/appointments/${appointmentId}/`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    withCredentials: true,

                });

                setAppointments(prevAppointments => prevAppointments.map(app => {
                    if (app.id === appointmentId) {
                        return response.data;
                    }
                    return app;
                }));
            }
        } catch (error) {
            console.error('Error updating checklist item status:', error);
            if (error.response) {
                console.log('Error response:', error.response.data);
            }
        }
    };

    const toggleAppointmentStatus = async (appointmentId) => {
        try {
            const appointment = appointments.find(app => app.id === appointmentId);
            if (appointment) {
                const updatedStatus = appointment.status === 'pending' ? 'done' : 'pending';

                const convertTo12HourFormat = (timeString) => {
                    const time = new Date(`1970-01-01T${timeString}`);
                    const hours = time.getHours();
                    const minutes = time.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const hours12 = hours % 12 || 12;
                    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
                    return `${hours12}:${minutesStr} ${ampm}`;
                };

                const formattedAppointmentTime = convertTo12HourFormat(appointment.appointment_time);

                const payload = {
                    ...appointment,
                    appointment_time: formattedAppointmentTime,
                    status: updatedStatus,
                };

                const response = await axios.put(`/api/appointments/${appointmentId}/`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    withCredentials: true,
                });

                setAppointments(prevAppointments => prevAppointments.map(app => {
                    if (app.id === appointmentId) {
                        return response.data;
                    }
                    return app;
                }));
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
            if (error.response) {
                console.log('Error response:', error.response.data);
            }
        }
    };

    if (!user) {
        return <p className="text-center mt-4">Please log in to view appointments.</p>;
    }

    return (
        <div className="container mx-auto mt-24 px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Appointments</h2>

            <Filters filter={filter} setFilter={setFilter} resetFilters={resetFilters} />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments.map(appointment => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        toggleAppointmentStatus={toggleAppointmentStatus}
                        toggleChecklistItemStatus={toggleChecklistItemStatus}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
