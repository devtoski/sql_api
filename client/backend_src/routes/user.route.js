const express=require('express');
const router=express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const userController = require('../controller/user.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(userController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(userController.signin));

module.exports = router;


// // Login Form
// router.get('/signin', function(req, res) {
//     res.render('signin')
// })

// // retrieve all Users
// router.get('/', userController.findAll)

// // // retrieve a single User and signin
// // router.get('/:id', userController.signin)

// // update a User
// router.put('/:id', userController.updateById)

// // delete a User
// router.delete('/:id', userController.delete)
