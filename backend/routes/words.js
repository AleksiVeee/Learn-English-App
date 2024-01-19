const database = require("../database/dbFunctions.js");
const express = require("express");
const router = express.Router();

/**
 * route for getting all words from the database
 * @route GET /api/words
 * @param {string} path - the path for the route
 * @param {callback} middleware - the middleware for the route
 * @returns {object} - the response object containing the words
 */
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

/**
 * route for deleting a word pair from the database using the id
 * @route DELETE /api/words/:myId
 * @param {string} path - the path for the route with the id
 * @param {callback} middleware - the middleware for the route
 * @returns {object} - the response object containing the deleted word pair
 */
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

/**
 * middleware for validating the data in the request body for the patch route
 * @param {object} req - the request object 
 * @param {object} res - the response object
 * @param {callback} next - the callback function for the next middleware
 * @returns {object} - the response object containing the error message
 */
const validatePatchWords = (req, res, next) => {
  const { english_word, finnish_word } = req.body;
  const isString = (value) => typeof value === "string";
  const isNumericString = (value) => !isNaN(value);

  if (
    !isString(english_word) ||
    isNumericString(english_word) ||
    !isString(finnish_word) ||
    isNumericString(finnish_word)
  ) {
    res
      .status(400)
      .json({ error: "Invalid data. Words must be non-numeric strings." });
  } else {
    next();
  }
};

/**
 * route for updating a word pair in the database using the id
 * @route PATCH /api/words/:myId
 * @param {string} path - the path for the route with the id
 * @param {callback} middleware - the middleware for the route 
 * @returns {object} - the response object containing the updated word pair
 */
router.patch("/:myId([0-9]+)", validatePatchWords, async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const word = await database.partialUpdate(id, req.body);
    res.status(200).json(word);
  } catch (error) {
    if (error.message === "not found") {
      res.status(404).json({ error: "Word not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

/**
 * middleware for validating the data in the request body for the post route
 * @param {object} req - the request object 
 * @param {object} res - the response object
 * @param {callback} next - the callback function for the next middleware
 * @returns {object} - the response object containing the error message
 */
const validateWords = (req, res, next) => {
  const { english_word, finnish_word } = req.body;
  const isString = (value) => typeof value === "string";
  const isNumericString = (value) => !isNaN(value);

  if (
    !isString(english_word) ||
    isNumericString(english_word) ||
    !isString(finnish_word) ||
    isNumericString(finnish_word)
  ) {
    res
      .status(400)
      .json({ error: "Invalid data. Words must be non-numeric strings." });
  } else {
    next();
  }
};

/**
 * route for adding a new word pair to the database
 * @route POST /api/words
 * @param {string} path - the path for the route
 * @param {callback} middleware - the middleware for the route 
 * @returns {object} - the response object containing the new word pair
 */
router.post("/", validateWords, async (req, res) => {
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

module.exports = router;
