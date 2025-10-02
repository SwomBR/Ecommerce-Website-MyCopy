import { Schema, model } from "mongoose";

const bannerSchema = new Schema({
  image: { type: String, required: true, trim: true },   
  purpose: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Banner = model("Banner", bannerSchema);
export default Banner;
