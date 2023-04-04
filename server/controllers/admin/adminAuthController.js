const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Admin = require('../../models/Admin');

// Kikulach0K1ngu0n1mwak0

const login = asyncHandler(async (req, res) => {
  const {name, password} = req.body

  if (!name || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const admin = await Admin.findOne({ name: req.body.name });
  if(!admin){
    return res.status(401).json({ title: 'One Little Problem', description: 'Invalid login details. Contact your technician for support' })
  }

  const match = await bcrypt.compare(password, admin.password)
  if (!match) return res.status(401).json({ title: 'One Little Problem', description: 'Invalid login details. Contact your technician for support' })

  req.session.adminId = admin._id.toString();
  res.status(201).json({ message: `Admin: ${name} successfully logged in` })
})

const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.status(200).json({message: "Logged out successfully"});
})

module.exports = { login, logout }