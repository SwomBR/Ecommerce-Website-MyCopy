import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EnquiryDetails = () => {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await fetch(`/api/enquiry/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setEnquiry(data);
      } catch (err) {
        console.error("Error fetching enquiry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  if (loading) return <div className="p-6 text-lg font-semibold">Loading enquiry details...</div>;
  if (!enquiry) return <div className="p-6 text-gray-600">Enquiry not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enquiry Details</h2>

      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> {enquiry.name}</p>
        <p><span className="font-semibold">Email:</span> {enquiry.email}</p>
        <p><span className="font-semibold">Phone:</span> {enquiry.phone}</p>
        <p><span className="font-semibold">Country:</span> {enquiry.country}</p>
        <p><span className="font-semibold">Product/Service:</span> {enquiry.productService}</p>
        <p><span className="font-semibold">Message:</span> {enquiry.message}</p>
        <p><span className="font-semibold">Submitted On:</span> {new Date(enquiry.createdAt).toLocaleString()}</p>
      </div>

      <button
        onClick={() => navigate("/enquiries")}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Back to All Enquiries
      </button>
    </div>
  );
};

export default EnquiryDetails;
