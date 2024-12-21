const pool = require("../config/db");
const {
  get_all_books,
  delete_book,
  create_book,
  getBookById,
  edit_book,
} = require("../services/bookService");

const getAllBook = async (req, res) => {
  const result = await get_all_books();
  return res.json(result);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const result = await getBookById(id);
  return res.json(result);
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, imageUrl } = req.body;
  //   const result = await edit_book({
  //     id: id,
  //     name: name,
  //     category: category,
  //     description: description,
  //     imageUrl: imageUrl,
  //   });
  const result = await edit_book({
    id: id,
    name: name,
    category: category,
    description: description,
    imageUrl: imageUrl,
  });
  return res.json(result);
};

const addBook = async (req, res) => {
  try {
    const { name, category, description, imageUrl } = req.body;
    if (!name || !category || !description || !imageUrl) {
      return res.status(400).json({ message: "missing field" });
    }
    const result = await create_book({
      name: name,
      category: category,
      description: description,
      imageUrl: imageUrl,
    });
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "create book unsuccessfully" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const result = await delete_book(id);
  return res.json(result);
};

module.exports = {
  getAllBook,
  updateBook,
  addBook,
  deleteBook,
  getBook,
};
