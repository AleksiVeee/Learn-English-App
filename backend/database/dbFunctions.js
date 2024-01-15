const pool = require("./config.js");

module.exports = {
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

  saveWord: (newWord) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO words SET ?";

      pool.query(sql, newWord, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const savedWord = { ...newWord, id: results.insertId };
          resolve(savedWord);
        }
      });
    });
  },

  deleteById: (id) => {
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

  partialUpdate: (id, changes) => {
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
