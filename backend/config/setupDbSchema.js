const pool = require("./db");
const debug = require("debug")("BookVerse:config:dbSchema");

const createTables = async () => {
  try {
    await pool.query(/* sql */ ` 
CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL UNIQUE,
        email VARCHAR NOT NULL UNIQUE,
        password_hashed VARCHAR NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('reader', 'author'))
      );

      CREATE TABLE IF NOT EXISTS Series (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        status VARCHAR(50) CHECK (status IN ('incomplete', 'complete', 'standalone')),
        author_id INT REFERENCES Users(id)
      );

      CREATE TABLE IF NOT EXISTS Books (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        author_id INT REFERENCES Users(id),
        blurb TEXT,
        dedication TEXT,
        publication_date DATE,
        format_ebook BOOLEAN,
        format_physical BOOLEAN,
        format_audio BOOLEAN,
        series_id INT REFERENCES Series(id),
        order_in_series INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Follows (
        id SERIAL PRIMARY KEY,
        reader_id INT REFERENCES Users(id),
        author_id INT REFERENCES Users(id)
      );

      CREATE TABLE IF NOT EXISTS WatchSeries (
        id SERIAL PRIMARY KEY,
        reader_id INT REFERENCES Users(id),
        series_id INT REFERENCES Series(id)
      );

      CREATE TABLE IF NOT EXISTS Bookshelves (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id),
        book_id INT REFERENCES Books(id)
      );

      CREATE TABLE IF NOT EXISTS BookNotes (
        id SERIAL PRIMARY KEY,
        book_id INT REFERENCES Books(id),
        user_id INT REFERENCES Users(id),
        rating INT CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        loan_status VARCHAR(50) CHECK (loan_status IN ('bought', 'loaned')),
        format VARCHAR(50) CHECK (format IN ('ebook', 'audiobook', 'physical'))
      );

      CREATE TABLE IF NOT EXISTS StatusUpdates (
        id SERIAL PRIMARY KEY,
        author_id INT REFERENCES Users(id),
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    debug("Tables created successfully");
  } catch (err) {
    debug("Error creating tables", err);
  } finally {
    pool.end();
  }
};

createTables();
