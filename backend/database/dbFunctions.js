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
};
