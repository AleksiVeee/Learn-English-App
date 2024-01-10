const express = require("express");
const pool = require("./database/config.js");
const wordsRouter = require("./routes/words.js");
const cors = require("cors");

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.use("/api/words", wordsRouter);

const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("SERVER: Starting graceful shutdown...");
  if (server) {
    console.log("SERVER: Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("SERVER: Error closing Express server:", err);
      } else {
        console.log("SERVER: stopped");
      }

      console.log("MYSQL: Starting graceful shutdown...");
      pool.end((err) => {
        if (err) {
          console.error("MYSQL: Error closing MySQL connection:", err);
        } else {
          console.log("APPLICATION: shutdown complete");
        }
      });
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requires shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
