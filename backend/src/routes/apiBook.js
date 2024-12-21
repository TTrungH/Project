const express = require("express");
const router = express.Router();
const { getAllBook, updateBook, addBook, deleteBook, getBook } = require("../controllers/bookController");

const timeLog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
};

router.use(timeLog);

router.get("/", getAllBook);

router.get("/:id", getBook);

router.put("/update/:id", updateBook);

router.post("/add", addBook);

router.delete("/delete/:id", deleteBook);



module.exports = router;
