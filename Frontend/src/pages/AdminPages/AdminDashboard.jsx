import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <>
    <AdminNavbar/>
    <div className="flex min-h-screen bg-gray-100 font-poppins">     
      <div className="flex-1 ml-64 bg-white flex flex-col items-center p-10 w-full"> 

        <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-lg animate-fade-in text-center mt-[200px]">
          Welcome to <br/>DuroCap Roofing Solutions <br/> Admin Dashboard
        </p>
        
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;