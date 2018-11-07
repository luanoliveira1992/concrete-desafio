const bcrypt = require('bcrypt');

const exception = require('../errors');
const UserSchema = require('./user');

module.exports.findById = async (req, res, next) => {

    try {

        //Given a valid token, is need to bring the user.
        let user = await this.findUser(req.params.id, req.token);
        res.status(200).json(user);

    } catch (error) {
        next(exception.getKnownError(error));
    }
}

module.exports.findUser = async (id, token) => {

    let user = await UserSchema.findById(id);

    if (!user) {
        throw new exception.InvalidParams();
    }
    if (user.token !== token) {
        throw new exception.Unauthorized();
    }
    return user;
}
