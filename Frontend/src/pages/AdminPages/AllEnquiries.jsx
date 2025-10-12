import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/viewAllEnquiries", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) return <div className="p-6 text-lg font-semibold">Loading enquiries...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Enquiries</h2>

      {enquiries.length === 0 ? (
        <p className="text-gray-500">No enquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>
                <th className="py-2 px-4 border-b text-left">Product/Service</th>
                <th className="py-2 px-4 border-b text-left">Country</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{enquiry.name}</td>
                  <td className="py-2 px-4">{enquiry.email}</td>
                  <td className="py-2 px-4">{enquiry.phone}</td>
                  <td className="py-2 px-4">{enquiry.productService}</td>
                  <td className="py-2 px-4">{enquiry.country}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => navigate(`/enquiries/${enquiry._id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllEnquiries;
