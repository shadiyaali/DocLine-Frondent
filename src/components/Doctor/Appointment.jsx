import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  async function getAppointments() {
    try {
      const response = await axios.get(`${BASE_URL}/api/appointments/`);
      console.log(response);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/appointments/${appointmentId}/`, {
        status: newStatus
      });
      console.log(response);
      toast.success('Appointment status updated successfully');
      getAppointments(); // Refresh the list of appointments
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error('Failed to update appointment status');
    }
  };
  

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-left">Doctor Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-semibold text-gray-800">Date</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Patient</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Start Time</th>
              <th className="px-4 py-2 font-semibold text-gray-800">End Time</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Mark as Consulted</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((appointment, index) => (
              <tr key={index} className="bg-white" style={{ paddingBottom: '0.5rem' }}>
                <td className="px-4 py-2 border-b">
                  <div className="flex text-center justify-center">
                    <p className="font-medium">{appointment?.slot?.date}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{appointment?.patient?.first_name}</td>
                <td className="px-4 py-2 border-b">{appointment?.slot?.start_time}</td>
                <td className="px-4 py-2 border-b">{appointment?.slot?.end_time}</td>
                <td className="px-4 py-2 border-b">{appointment?.status}</td>
                <td className="px-4 py-2 border-b">
                  {appointment?.status !== 'completed' ? (
                    <button
                      className="bg-red-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                    >
                      &#10004; Mark as Consulted
                    </button>
                  ) : (
                    <span>&#10004; Consulted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer /> {/* Toast container for displaying success/error messages */}
    </div>
  );
};

export default DoctorAppointments;
