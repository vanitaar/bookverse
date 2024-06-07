const pool = require("./db");
const debug = require("debug")("BookVerse:config:dbSchema");

const createTables = async () => {
  try {
    await pool.query(/* sql */ ` 
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hashed VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('reader', 'author'))
      );

      CREATE TABLE IF NOT EXISTS Series (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('incomplete', 'complete', 'standalone')),
        author_id INT REFERENCES Users(id) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INT REFERENCES Users(id) NOT NULL,
        image_url TEXT,
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
        reader_id INT REFERENCES Users(id) NOT NULL,
        author_id INT REFERENCES Users(id) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS WatchSeries (
        id SERIAL PRIMARY KEY,
        reader_id INT REFERENCES Users(id) NOT NULL,
        series_id INT REFERENCES Series(id) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Bookshelves (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id) NOT NULL,
        book_id INT REFERENCES Books(id) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS BookNotes (
        id SERIAL PRIMARY KEY,
        book_id INT REFERENCES Books(id) NOT NULL,
        user_id INT REFERENCES Users(id) NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        loan_status VARCHAR(50) CHECK (loan_status IN ('bought', 'loaned')),
        format VARCHAR(50) CHECK (format IN ('ebook', 'audiobook', 'physical'))
      );

      CREATE TABLE IF NOT EXISTS StatusUpdates (
        id SERIAL PRIMARY KEY,
        author_id INT REFERENCES Users(id) NOT NULL,
        status TEXT NOT NULL,
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    debug("Tables created successfully");
  } catch (err) {
    debug("Error creating tables", err);
    // } finally {
    //   pool.end();
  }
};

createTables();
