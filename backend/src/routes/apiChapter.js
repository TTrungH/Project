const express = require("express");
const router = express.Router();
const { getAllChapter, getChapter,updateChapter, addChapter, deleteChapter } = require("../controllers/chapterController");

const timeLog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
};

router.use(timeLog);

router.get("/:truyenId", getAllChapter);

router.get("/:truyenId/:chapterId", getChapter);

router.put("/update/:truyenId/:chapterId", updateChapter);

router.post("/add", addChapter);

router.delete("/delete/:truyenId/:chapterId", deleteChapter);



module.exports = router;