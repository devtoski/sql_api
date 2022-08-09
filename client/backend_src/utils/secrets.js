require('dotenv/config');

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET_KEY
} = process.env;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET_KEY
};