const {
    createNewUser,
    getUserById,
    get_all_users,
    auth_user,
    delete_user,
    update_user,
} = require("../services/userServices");

const authUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "missing field" });
    }
    const result = await auth_user({ username, password });
    return res.json(result);
};

const createUser = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "missing field" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "password must be at least 8 characters" });
        }
        const result = await createNewUser({
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            groupId: 1,
        });
        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ message: result.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const result = await getUserById(id);
    return res.status(200).json(result);
};

const getAllUsers = async (req, res) => {
    const result = await get_all_users();
    return res.json(result);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log("req", req.params);

    if (!id) {
        return res.status(400).json({ message: "missing field" });
    }
    const result = await delete_user(id);
    return res.json(result);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "missing field" });
    }
    const { username, password, email, firstName, lastName } = req.body;
    if (username) {
        return res.status(400).json({ message: "username cannot be changed" });
    }
    const result = await update_user({ id, username, password, email, firstName, lastName });
    return res.json(result);
};

module.exports = {
    createUser,
    getUser,

    getAllUsers,
    authUser,
    deleteUser,
    updateUser,
};
