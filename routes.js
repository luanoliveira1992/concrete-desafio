let userController = require('./user/user-controller');
let authController = require('./auth/auth-controller');
let jwt = require('./jwt/handler');

module.exports = function (router) {

	router.post('/login', authController.login);
	router.post('/singup', authController.singup);
	router.get('/user/:id', jwt.authenticate, userController.findById);
};