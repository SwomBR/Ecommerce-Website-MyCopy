import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AllEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("http://localhost:8000/viewAllEnquiries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEnquiries(data);
      setFilteredEnquiries(data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

   useEffect(() => {
    let filtered = enquiries;
    if (filterType !== "all") {
      filtered = filtered.filter(
        (e) => e.enquiryType?.toLowerCase() === filterType.toLowerCase()
      );
    }
    setFilteredEnquiries(filtered);
  }, [filterType, enquiries]);

   const handleView = async (id) => {
    try {
       await fetch(`http://localhost:8000/markAsViewed/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

       setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, viewed: true } : e))
      );

       navigate(`/enquiries/${id}`);
    } catch (err) {
      console.error("Error marking enquiry as viewed:", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading enquiries...</div>;
  }

  return (
    <>
    <AdminNavbar/>
    <div className="p-2 max-w-6xl mx-auto ml-[400px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Enquiries</h2>

       <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="product related">Product Related</option>
          <option value="service related">Service Related</option>
          <option value="estimation">Estimation</option>
        </select>
      </div>

       {filteredEnquiries.length === 0 ? (
        <p className="text-gray-500">No enquiries found for the selected filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{enquiry.name}</td>
                  <td className="py-2 px-4">{enquiry.email}</td>
                  <td className="py-2 px-4">{enquiry.phone}</td>
                  <td className="py-2 px-4">{enquiry.enquiryType}</td>
                  <td className="py-2 px-4">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {enquiry.viewed ? (
                      <span className="text-green-600 font-semibold">Viewed</span>
                    ) : (
                      <span className="text-red-500 font-semibold">New</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleView(enquiry._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
    </>
  );
};

export default AllEnquiries;
