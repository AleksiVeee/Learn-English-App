const database = require("../database/dbFunctions.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const words = await database.findAll();
    res.json(words);
  } catch (error) {
    console.error("Error in /api/words route:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
