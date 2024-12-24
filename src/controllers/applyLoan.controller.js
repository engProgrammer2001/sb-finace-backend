import ApplyLoan from "../models/applyLoanSchema.js";
export const PostLoanData = async (req, res) => {
  try {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "panNumber",
      "aadharNumber",
      "loanAmount",
      "monthlySalary",
      "loanPurpose",
      "gender",
      "state",
      "city",
      "employmentStatus",
      "pincode",
      "date",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing fields: ${missingFields.join(", ")}` });
    }
    const loanApplication = new ApplyLoan(req.body);
    await loanApplication.save();

    res.status(201).json({
      message: "Loan application submitted successfully",
      data: loanApplication,
    });
  } catch (error) {
    console.error("Error saving loan application: ", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET: Fetch Loan Data
export const getLoanData = async (req, res) => {
  try {
    const loans = await ApplyLoan.find().sort({ createdAt: -1 });
    res.status(200).json({ data: loans });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching loan data", details: error.message });
  }
};

// DELETE: Delete Loan Data
export const deleteLoanData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLoan = await ApplyLoan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res.status(404).json({ error: "Loan application not found" });
    }

    res.status(200).json({ message: "Loan application deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting loan application",
      details: error.message,
    });
  }
};
