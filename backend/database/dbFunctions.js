const pool = require("./config.js");

/**
 * export functions to be used in the wordsRouter
 */
module.exports = {
  /**
   * @function
   * Find all words from the database
   * @returns {Promise} A promise that resolves to an array of words
   */
  findAll: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM words", (error, results) => {
        if (error) {
          reject(error);
          console.error("Error executing MySQL query:", error);
        } else {
          resolve(results);
        }
      });
    });
  },

  /**
   * @function 
   * save a new word to the database
   * @param {object} newWord - the new word to be saved
   * @returns {Promise} A promise that resolves to the new word
   */
  saveWord: (newWord) => {
    //function to save a new words to the database
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO words SET ?";

      pool.query(sql, newWord, (error, results) => {
        if (error) {
          reject(error);
        } else {
          //makes sure that new id is added to the new word
          const savedWord = { ...newWord, id: results.insertId };
          resolve(savedWord);
        }
      });
    });
  },

  /**
   * @function
   * delete a word from the database by id
   * @param {number} id - the id of the word to be deleted
   * @returns {Promise} A promise that resolves to the deleted word
   */
  deleteById: (id) => {
    //function to delete a word pair from the database
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM words WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows > 0) {
            resolve(results);
          } else {
            reject(new Error("not found"));
          }
        }
      });
    });
  },

  /**
   * @function
   * update a word in the database by id
   * @param {number} id - the id of the word to be updated
   * @param {object} changes - the changes to be made to the word
   * @returns {Promise} A promise that resolves to the updated word
   */
  partialUpdate: (id, changes) => {
    //function to update a word in the database
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE words SET ? WHERE id = ?",
        [changes, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            if (results.affectedRows > 0) {
              resolve({ id, ...changes });
            } else {
              reject(new Error("not found"));
            }
          }
        }
      );
    });
  },
};
