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

router.post("/", async (req, res) => {
  try {
    const newWord = {
      english_word: req.body.english_word,
      finnish_word: req.body.finnish_word,
      learning_direction: req.body.learning_direction,
    };

    const savedWord = await database.saveWord(newWord);
    res.status(200).json(savedWord);
  } catch (error) {
    console.error("Error saving word:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    await database.deleteById(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === "not found") {
      res.status(404).json({ error: "Word pair not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
