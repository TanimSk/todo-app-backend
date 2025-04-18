const db = require("../config/db");
const bcrypt = require("bcrypt");

async function createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if email already exists
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }
    // insert new user into database
    return db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
}

async function getUserByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

async function getUserById(id) {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
}

module.exports = { createUser, getUserByEmail, getUserById };
