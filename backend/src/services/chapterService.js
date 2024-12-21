const { where } = require("sequelize");
const db = require("../models/index");
const {
  getBookById,
  incre_total_chapter,
  decre_total_chapter,
} = require("./bookService");
const { formatDate } = require("../utils/formats");

const get_all_chapters = async (id) => {
  return getBookById(id);
};

const getChapterById = async ({ truyenId, chapterId }) => {
  try {
    const result = await db.Chapters.findOne({
      where: {
        id: chapterId,
        truyenId: truyenId
      },
      attributes: ["id", "name", "content", "truyenId", "orderNumber"],
    });
    console.log(">>>>> result: ", result);

    if (result) {
      return { message: "get chapter succesfully", result: result };
    }

    return { message: "get chapter fail" };
  } catch (error) {
    console.log(error);
    return { message: "get chapter fail" };
  }
};

const delete_chapter = async ({ truyenId, chapterId }) => {
  try {
    const result = await db.Chapters.destroy({
      where: {
        truyenId: truyenId,
        id: chapterId,
      },
    });

    console.log(">>>>>result: ", result);

    if (result) {
      const { message } = decre_total_chapter(truyenId);
      console.log("message:::::", message);

      if (message.toLowerCase() === "decrease total chapter successfully") {
        return { message: "delete chapter successfully" };
      }
      return { message: "delete chapter fail" };
    }
    return { message: "delete chapter fail" };
  } catch (error) {
    console.log(error);
    return { message: "delete chapter fail" };
  }
};

const edit_chapter = async (params) => {
  console.log(params);
  const { truyenId, chapterId, name, content } = params;
  console.log("truyenId:::::", truyenId);

  try {
    let result = await db.Chapters.findOne({
      where: {
        truyenId: +truyenId,
        id: +chapterId,
      },
    });
    console.log("result:::::", result);

    if (!result) {
      return { message: "Book's not found" };
    }
    console.log(">>>>>result: ", result);
    result.set({
      name: name ? name : result.name,
      content: content ? content : result.content,
    });

    console.log(">>>>>result: ", result);

    const result1 = await result.save();
    console.log(">>>>>last result: ", result1);

    if (result) {
      return { message: "update chapter successfully" };
    }
    return { message: "update chapter fail" };
  } catch (error) {
    console.log(error);
    return { message: "update chapter fail" };
  }
};

const create_chapter = async ({ truyenId, chapterName, content }) => {
  try {
    const result1 = await db.Truyens.findOne({
      where: { id: truyenId },
    });
    console.log(">>>>>TOtal Chapter: ", result1);

    console.log("chapter Name ::::", chapterName);

    const [result, recorded] = await db.Chapters.findOrCreate({
      where: {
        name: chapterName,
        truyenId: truyenId,
      },
      defaults: {
        name: chapterName,
        content: content,
        truyenId: truyenId,
        orderNumber: +result1.totalChapter + 1,
      },
    });
    console.log("Record:::::", recorded);

    if (recorded) {
      const { message } = incre_total_chapter(truyenId);
      const temp = String(message);
      if (temp.toLowerCase() === "increase total chapter successfully") {
        return { message: "A chapter was created successfully" };
      }
      console.log(">>>>>>>>>>>>>>>>Heeellooo");
      return { message: "create chapter failed" };
    }
    return { message: "chapter contained" };
  } catch (error) {
    console.log(error);
    return { message: "create chapter failed" };
  }
};

module.exports = {
  get_all_chapters,
  getChapterById,
  delete_chapter,
  edit_chapter,
  create_chapter,
};
