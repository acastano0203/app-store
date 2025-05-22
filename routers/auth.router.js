const express = require("express");
const router = express.Router();
const { loginUser } = require("../services/auth.service.js");

router.post("/", async (req, res) => {
  const { username, password, id } = req.body;
  try {
    const result = await loginUser(username, password, id);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
