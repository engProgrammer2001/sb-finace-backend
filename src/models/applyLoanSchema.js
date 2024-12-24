import mongoose from "mongoose";

const applyLoanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  loanPurpose: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  employmentStatus: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplyLoan = mongoose.model("ApplyLoan", applyLoanSchema);
export default ApplyLoan;
