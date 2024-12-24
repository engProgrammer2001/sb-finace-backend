import express from "express";
import cors from "cors";
import userRoute from "./src/routes/user.route.js";
import uploadLogoRoute from "./src/routes/uploadLogo.route.js";
import uploadFooterLogoRoute from "./src/routes/footerandfavicon.route.js";
import applyLoanRoute from "./src/routes/applyLoan.route.js";
import connectDB from "./src/config/db.js";

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());   

// Constants
const PORT = process.env.PORT || 5151;

// Serve an image using a direct URL
app.get("/", (req, res) => {
  const imageUrl =
    "https://www.racksolutions.com/news//app/uploads/AdobeStock_87909563.jpg";
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SB-Finance Backend</title>
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <img src="${imageUrl}" alt="SB-Finance Image" />
    </body>
    </html>
  `;
  res.send(htmlContent);
});

// Static files
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/user", userRoute);
app.use("/logo", uploadLogoRoute);
app.use("/footerlogo", uploadFooterLogoRoute);
// app.use("/favicon", uploadFaviconRoute);
app.use("/loans", applyLoanRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


// Start the server
app.listen(PORT, async () => {
  try {
    await connectDB(); 
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
});

