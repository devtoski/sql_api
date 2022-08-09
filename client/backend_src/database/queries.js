const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const Article=require('../models/article.model')

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

// SIGNUP
const createNewUser = `INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW())
`;

// SIGNIN
const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const getAll =`SELECT * FROM users`

const updateById = `UPDATE users SET id = ?, firstname = ?, lastname = ?, email = ?, password = ?, create_on = ? WHERE id = ?`

const Delete = `DELETE FROM users WHERE id = ?,`




const createTableArticles = `
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NULL,
    author VARCHAR(50) NULL,
    body VARCHAR(255) NOT NULL UNIQUE,
    created_on DAY() NOT NULL DEFAULT DAY()
)
`;



// SIGNUP
const createNewArticle = `INSERT INTO articles VALUES(null, ?, ?, ?, NOW())`;

// SIGNIN
const findArticleByAuthorOrTitle = "SELECT * FROM `articles` WHERE `title` LIKE '%?%' OR `author` LIKE '%?%'";


const getAllArticle =`SELECT * FROM articles`

const updateArticleByTitle = `UPDATE articles SET title = ?, author = ?, body = ? WHERE id = ?`

const DeleteArticle = `DELETE FROM articles WHERE id = ?`

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail, 
    getAll, 
    updateById,
    Delete,


    // ArtcreateNewArticle
    createTableArticles,
    createNewArticle,
    findArticleByAuthorOrTitle,
    getAllArticle,
    updateArticleByTitle,
    DeleteArticle
};