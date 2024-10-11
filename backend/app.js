//Starting file of backend

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const toolsRoutes = require("./routes/tools");
app.use("/tools", toolsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
