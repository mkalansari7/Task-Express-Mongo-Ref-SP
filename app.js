const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const productsRoutes = require("./api/products/routes");
const dotenv = require("dotenv");
const shopsRoutes = require("./api/shops/routes");
const signupRoutes = require("./api/user/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/products", productsRoutes);
app.use("/shops", shopsRoutes);
app.use("/signup", signupRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running", PORT);
  connectDB();
});
