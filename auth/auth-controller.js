'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const exception = require('../errors');

const UserDao = require('../user/user-DAO');


module.exports.login = async (req, res, next) => {

    try {

        let user = await this.findAnValidUserByEmail(req.body.email, req.body.senha);
        res.status(200).json(user);
    } catch (error) {
        next(exception.getKnownError(error));
    }
}

module.exports.singup = async (req, res, next) => {

    try {

        let user = await new UserDao().createUser(req.body, req.body.senha);
        res.status(200).json(user);

    } catch (error) {
        next(exception.getKnownError(error));

    }
}

module.exports.findAnValidUserByEmail = async (email, senha) => {

    let userDao = new UserDao();
    let user = await userDao
        .findByEmail(email);

    if (!user)
        throw new exception.InvalidCredentials();

    if (!bcrypt.compare(user.senha, senha)) {
        throw new exception.InvalidCredentials();
    }

    user = await userDao.updateLastLoginUser(user);
    return user;
}