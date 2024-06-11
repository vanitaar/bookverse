const express = require("express");
const passport = require("passport");
const {
  //   getAllBooks,
  getAllBooksByAuthor,
  addBook,
} = require("../controllers/booklistController");

const router = express.Router();

// /api
router.get(
  "/authors/:authorId/booklist",
  passport.authenticate("jwt", { session: false }),
  getAllBooksByAuthor
);

router.post(
  "/authors/:authorId/booklist/new",
  passport.authenticate("jwt", { session: false }),
  addBook
);

// router.get("/books/search", getAllBooks);
