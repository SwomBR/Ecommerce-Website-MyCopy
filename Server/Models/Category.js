import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: ""},
    image: { type: String,  default: "" },
    createdAt: { type: Date, default: Date.now }
  },{ timestamps: true });

const Category = model("Category", categorySchema);

export default Category;
