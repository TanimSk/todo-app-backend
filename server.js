const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const swaggerDocument = YAML.load("./openapi.yaml");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
