const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');

const generate = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generate,
    decode
}