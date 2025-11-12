import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false }
);

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    location: { type: String, index: true },
    industry: { type: String, index: true },
    website: { type: String },
    logoUrl: { type: String },
    size: { type: Number },
    foundedYear: { type: Number },
    revenue: { type: String },
    description: { type: String },
    contact: { type: ContactSchema },
    address: { type: AddressSchema },
  },
  { timestamps: true }
);

CompanySchema.index({
  name: "text",
  location: "text",
  industry: "text",
  description: "text",
});

export const Company = mongoose.model("Company", CompanySchema);
