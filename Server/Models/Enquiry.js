import { Schema, model } from "mongoose";

const enquirySchema = new Schema({
  productService: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  country: { type: String, required: true, trim: true },
  phone: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^[0-9]{7,15}$/, "Invalid phone number"] 
  },
  message: { type: String, required: true, trim: true, minlength: 5 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Enquiry = model("Enquiry", enquirySchema);
export default Enquiry;
