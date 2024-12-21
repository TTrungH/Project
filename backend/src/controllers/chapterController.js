const pool = require("../config/db");
const {
  get_all_chapters,
  delete_chapter,
  create_chapter,
  edit_chapter,
  getChapterById,
} = require("../services/chapterService");

const getAllChapter = async (req, res) => {
  const { truyenId } = req.params;
  const result = await get_all_chapters(truyenId);
  return res.json(result);
};

const updateChapter = async (req, res) => {
  const { truyenId, chapterId } = req.params;
  console.log("params::::::", req.params);

  const { name, content } = req.body;
  //   const result = await edit_chapter({
  //     id: id,
  //     name: name,
  //     category: category,
  //     description: description,
  //     imageUrl: imageUrl,
  //   });

  const parameter = {
    truyenId: truyenId,
    chapterId: chapterId,
    name: name,
    content: content,
  };
  console.log("pataadfsafsd::::", parameter);

  const result = await edit_chapter(parameter);
  return res.json(result);
};

const addChapter = async (req, res) => {
  try {
    const { truyenId, name, content } = req.body;
    console.log("truyenID::::", truyenId);

    if (!truyenId || !name || !content) {
      return res.status(400).json({ message: "missing field" });
    }
    const result = await create_chapter({
      chapterName: name,
      truyenId: truyenId,
      content: content,
    });
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "create chapter unsuccessfully" });
  }
};

const deleteChapter = async (req, res) => {
  const { truyenId, chapterId } = req.params;
  const result = await delete_chapter({
    truyenId: truyenId,
    chapterId: chapterId,
  });
  return res.json(result);
};
const getChapter = async (req, res) => {
  const { truyenId, chapterId } = req.params;
  const result = await getChapterById({
    truyenId: truyenId,
    chapterId: chapterId,
  });
  return res.json(result);
};
module.exports = {
  getAllChapter,
  updateChapter,
  addChapter,
  deleteChapter,
  getChapter,
};
