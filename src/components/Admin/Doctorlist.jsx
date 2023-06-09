import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from "../../images/download.jpeg";
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  async function getDoctors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/doctors/`);
      setDoctors(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const changeStatus = (id) => {
    axios.get(`${BASE_URL}/api/blockdoctor/${id}`)
    .then(()=>getDoctors())
  }
  
  

  useEffect(() => {
    getDoctors();
  }, []);
 

 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Doctors List</h1>
      <div className="flex items-center mb-4 justify-end">
        <input
          type="text"
          placeholder="Search by email or name"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-semibold text-gray-800"></th>
              <th className="px-4 py-2 font-semibold text-gray-800">Doctor Name</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Email</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Phone Number</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="bg-white" style={{ paddingBottom: '0.5rem'}}>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={doctor.image || Avatar}
                      alt="Avatar"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                  <p className="font-medium">Dr.{doctor.user.first_name}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{doctor.user.email}</td>
                <td className="px-4 py-2 border-b">{doctor.user.phone_number}</td>
                <td className="px-4 py-2 border-b">
                  {doctor.is_blocked ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                      Inactive
                    </span>
                    
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-light-green-800 bg-green rounded-full">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                <button
  className={`${
    doctor.is_blocked ? 'bg-light-green-800 hover:bg-light-green-800 ' : 'bg-red-600'
  } px-4 py-2 text-sm font-medium text-white rounded-lg`}
  onClick={() => {
    if (window.confirm('Are you sure you want to block/unblock this doctor?')) {
      changeStatus(doctor.id);
    }
  }}
>
  {doctor.is_blocked ? 'Unblock' : 'Block'}
</button>




                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer /> {/* Add ToastContainer component from react-toastify */}
    </div>
  );
}

export default DoctorList;

