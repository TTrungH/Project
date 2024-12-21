const db = require("../models/index");
const { formatDate } = require("../utils/formats");

const get_all_books = async () => {
  try {
    const result = await db.Truyens.findAll({
      include: {
        model: db.Chapters,
        required: false,
        raw: true,
        attributes: ["id","name", "content", "orderNumber"],
      },
      nest: true,
      attributes: [
        "id",
        "name",
        "category",
        "description",
        "imageUrl",
        "totalChapter",
      ],
    });
    return { message: "get all books succesfully", result: result };
  } catch (error) {
    return { message: "get books fail" };
  }
};

const getBookById = async (id) => {
  try {
    const result = await db.Truyens.findAll({
      where: {
        id: id,
      },
      nest: true,
      include: {
        model: db.Chapters,
        required: false,
        raw: true,
        attributes: ["id","name", "content", "orderNumber"],
      },
      attributes: [
        "id",
        "name",
        "category",
        "description",
        "imageUrl",
        "totalChapter",
      ],
    });
    console.log(">>>>> result: ", result);

    if (result) {
      return { message: "get book succesfully", result: result };
    }

    return { message: "get book fail" };
  } catch (error) {
    console.log(error);
    return { message: "get book fail" };
  }
};

const delete_book = async (id) => {
  try {
    const result2 = await db.Chapters.destroy({
      where: {
        truyenId: id,
      },
    });

    const result = await db.Truyens.destroy({
      where: {
        id: id,
      },
    });

    console.log(">>>>>result: ", result);

    if (result) {
      return { message: "delete book successfully" };
    }
    return { message: "delete book fail" };
  } catch (error) {
    console.log(error);
    return { message: "delete book fail" };
  }
};

const incre_total_chapter = async (id) => {
  try {
    let result = await db.Truyens.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      return { message: "book not found" };
    }
    console.log(">>>>>result: ", result.totalChapter);
    result.set({
      totalChapter: +result.totalChapter + 1,
    });

    console.log(">>>>>result: ", result);

    result = await result.save();
    console.log(">>>>>last result: ", result);

    if (result) {
      return { message: "increase total chapter successfully" };
    }
    return { message: "increase total chapter fail" };
  } catch (error) {
    console.log(error);
    return { message: "increase total chapter fail" };
  }
};

const decre_total_chapter = async (id) => {
    try {
      let result = await db.Truyens.findOne({
        where: {
          id: id,
        },
      });
      if (!result) {
        return { message: "book not found" };
      }
      if (+result.totalChapter === 0) {
        return { message: "There's no chapter" };
      }
      console.log(">>>>>result: ", result.totalChapter);
      result.set({
        totalChapter: +result.totalChapter - 1,
      });
      
      console.log(">>>>>result: ", result);
  
      result = await result.save();
      console.log(">>>>>last result: ", result);
  
      if (result) {
        return { message: "decrease total chapter successfully" };
      }
      return { message: "decrease total chapter fail" };
    } catch (error) {
      console.log(error);
      return { message: "decrease total chapter fail" };
    }
  };

const edit_book = async ({ id, name, category, description, imageUrl }) => {
  try {
    let result = await db.Truyens.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      return { message: "user not found" };
    }
    console.log(">>>>>result: ", result);
    result.set({
      name: name ? name : result.name,
      category: category ? category : result.category,
      description: description ? description : result.description,
      imageUrl: imageUrl ? imageUrl : result.imageUrl,
    });

    console.log(">>>>>result: ", result);

    result = await result.save();
    console.log(">>>>>last result: ", result);

    if (result) {
      return { message: "update book successfully" };
    }
    return { message: "update book fail" };
  } catch (error) {
    console.log(error);
    return { message: "update book fail" };
  }
};

const create_book = async ({ name, category, description, imageUrl }) => {
  try {
    const [result, recorded] = await db.Truyens.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
        category: category,
        description: description,
        imageUrl: imageUrl,
      },
    });
    if (recorded) {
      return { message: "A book was created successfully" };
    }
    return { message: "book contained" };
  } catch (error) {
    console.log(error);
   return  {message : "create book failed"};
  }
};

module.exports = {
  get_all_books,
  getBookById,
  delete_book,
  incre_total_chapter,
  edit_book,
  create_book,
  decre_total_chapter
};
