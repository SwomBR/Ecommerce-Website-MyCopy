import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: { type: String, required: true, trim: true },
  prodId: { type: String, required: true, unique: true, trim: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  material: { type: String, trim: true },
  shape: { type: String, trim: true },
  color: { type: String, trim: true },
  application: { type: String, trim: true },
  feature: { type: String, trim: true },
  pattern: { type: String, trim: true },
  origin: { type: String, trim: true },
  moq: { type: Number },
  mrp: { type: Number, required: true, min: 0 },
  discountPercent: { type: Number, min: 0, max: 100 },
  discountedPrice: { type: Number },
  weight: { type: String, trim: true },
  stockQty: { type: Number, required: true, min: 0 },
  size: { type: String, trim: true },
  thickness: { type: String, trim: true },
  battenDistance: { type: String, trim: true },
  coverage: { type: String, trim: true },
  breakStrength: { type: String, trim: true },
  description: { type: String, trim: true },
  waterAbsorb: { type: String, trim: true },
  model: { type: String, trim: true },
  usage: { type: String, trim: true },
  qtyPerSqFt: { type: String, trim: true },
  type: { type: String, trim: true },
  productImages: [{ type: String, required: true, trim: true }],
}, { timestamps: true });

productSchema.pre("save", function (next) {
  if (this.discountPercent && this.mrp) {
    this.discountedPrice = parseFloat(
      (this.mrp - (this.mrp * this.discountPercent / 100)).toFixed(2)
    );
  } else {
    this.discountedPrice = this.mrp;
  }
  next();
});

const Product = model("Product", productSchema);
export default Product;
