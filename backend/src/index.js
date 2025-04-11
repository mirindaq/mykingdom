require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Áp dụng cấu hình cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/brands", require("./routes/brand.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/articles", require("./routes/article.routes"));
app.use("/api/branches", require("./routes/branch.routes"));
app.use("/api/wishlist", require("./routes/wishlist.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/tags", require("./routes/tag.routes"));
