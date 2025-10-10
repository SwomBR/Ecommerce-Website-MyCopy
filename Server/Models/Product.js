import { Schema, model } from "mongoose"; 

const productSchema = new Schema({
  productName: { type: String, required: true, trim: true },
  prodId: { type: String, required: true, unique: true, trim: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  material: { type: String, required: true, trim: true },
  shape: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  application: { type: String, required: true, trim: true },
  feature: { type: String, required: true, trim: true },
  pattern: { type: String, required: true, trim: true },
  origin: { type: String, required: true, trim: true },
  reqPurchaseQty: { type: Number, required: true },
  mrp: { type: Number, required: true, min: 0 },
  discountPercent: { type: Number, min: 0, max: 100 },
  discountedPrice: { type: Number },
  weight: { type: String },
  stockQty: { type: Number, required: true, min: 0 },
  productImage: { type: String, required: true, trim: true },
}, { timestamps: true });

productSchema.pre("save", function(next) {
  this.discountedPrice = parseFloat(
    (this.mrp - (this.mrp * this.discountPercent / 100)).toFixed(2)
  );
  next();
});

const Product = model("Product", productSchema);

export default Product;
