import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    catname: { type: String, required: true, unique: true, trim: true },
    catId: { type: String, required: true,unique: true, default: ""},
    description:{ type:String, default:""},
    image: { type: String,  default: "" },
  },{ timestamps: true });

const Category = model("Category", categorySchema);

export default Category;
