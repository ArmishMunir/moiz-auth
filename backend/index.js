const express = require("express");
const userRoutes = require("./routes/user-routes");
const userModel = require("./models/user-model");
const cors = require("cors");
const connection = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  userModel.createUserTable();
  userModel.createRoleTable();
});
