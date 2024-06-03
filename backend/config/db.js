const { Pool } = require("pg");
const debug = require("debug")("BookVerse:backend:config:db");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//to enable query debugging
pool.on("connect", (client) => {
  client.on("query", (query) => {
    debug("Executing query:", query);
  });
});

module.exports = pool;
