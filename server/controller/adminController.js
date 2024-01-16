const { admin } = require("../modal/adminModal");
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ error: "please filled the field properly" })
    }
    try {
        const user = await admin.findOne({ username: username })
        if (user) {
            return res.status(422).json({ error: 'username already exist' })
        }
        else {
            const admins = new admin({ username, password });
            await admins.save();
            res.status(201).json({ message: "admin register successfuly" });
        }
    } catch (error) {

    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please filled the data" });
        }
        const userlogin = await admin.findOne({ username: username });
        const isMatch = bcrypt.compare(password, userlogin.password);

        const token = await userlogin.generateAuthToken();

        if (!isMatch) {
            res.status(400).json({ error: "invalid credentials" });
        } else {
            res.json({ token });
        }
    } catch (error) {
        res.send(error)
    }
}


exports.getadmin = async (req, res) => {
    try {
        const data = await admin.find()
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}