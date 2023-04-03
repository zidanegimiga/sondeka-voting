const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Admin = require('../../models/Admin');

const login = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (admin && await bcrypt.compare(req.body.password, admin.password)) {
    // Set up a session for the logged in admin
    req.session.admin = admin._id;
    res.status(201).json({ message: `Admin: ${username} successfully logged in` })
  } else {
    res.status(400).json({ message: `Admin: ${username} failed logging in` })
  }
})

const logout = asyncHandler(async (req, res) => {
  // Destroy session and redirect to login page
  req.session.destroy();
  res.status(200).json({message: "Logged out successfully"});
})

module.exports = { login, logout }