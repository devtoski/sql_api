const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);
    if (!req.body) {
        res.status(400).send({
            status: "error",
            message: 'please fill all fields'
        });
    } 
    
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const hashedPassword = hashPassword(password);
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    firstname:firstname, 
                    lastname:lastname, 
                    email:email, 
                    password:hashedPassword
                }
            });
        }
    });
};

// Find a single user by id
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}

// Retrieving all users from database
exports.findAll = (req, res) => {
    User.getAll=(err, data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users'
            })
        } else {
            res.send(data)
        }
    }
}

exports.updateById = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty'
        })
    }
    const { firstname, lastname, email, password } = req.body;
    User.updateById(
        Number(req.params.id), 
        new User(firstname, lastname, email, password),
        (err, data)=>{
            if (err) {
                if (err.kind== 'not_found') {
                    res.status(400).send({
                        message: `Not found User with id ${req.params.id}.`
                    })
                } else {
                    res.status(500).send({
                        message: 'Error updating User with id' + req.params.id
                    })
                }
            } else {
                res.send(data)
            }
        }
    )
}

exports.delete = (req, res) => {
    User.delete(Number(req.params.id),(err, data)=>{
        if (err) {
            if (err.kind== 'not_found') {
                res.status(400).send({
                    message: `Not found User with id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: 'Could not delete User with id' + req.params.id
                })
            }
        } else {
            res.send({message: 'User was deleted successfully'})
        }
    })
}