'use strict';

const bcrypt = require('bcrypt');
const jwt = require('../jwt/handler');
var UserSchema = require('./user');
const SALT = 8;

module.exports = class UserDao {

    async findByEmail(_email) {
        return UserSchema.findOne({ email: _email });
    }

    async createUser(body) {
        body.senha = bcrypt.hashSync(body.senha, SALT);
        body.token = jwt.getToken(body.email);
        let user = new UserSchema(body);
        user = user.save();
        return user;
    }

    async updateLastLoginUser(user) {

        let _token = jwt.getToken(user.email);
        return UserSchema.findOneAndUpdate(
            { '_id': user.id },
            {
                $set: {
                    ultimoLogin: Date.now(),
                    token: _token
                }
            }, { new: true });
    }
}
