const userModel = require("../models/user-model");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

const createUser = async (req, res) => {
  const { name, password, role } = req.body;
  if (!name || !password) {
    return res.status(400).send("Name and password are required");
  }

  try {
    await userModel.createUser(name, password, role);
    res.status(201).send("User created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send("Name and password are required");
  }

  try {
    const user = await userModel.findUserByName(name);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = generateToken(user);
    res.status(200).json({ token, role: user.role_name });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

const getUsers = (req, res) => {
  const query = `
    SELECT user.id, user.name, role.role_name 
    FROM user 
    LEFT JOIN role ON user.role_id = role.id;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users from database:", error);
      return res.status(500).send("Error fetching users from database");
    }
    res.status(200).json(results);
  });
};

module.exports = { createUser, loginUser, getUsers };