const chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    sinon = require('sinon'),
    chaiAsPromised = require('chai-as-promised'),
    sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.use(chaiAsPromised);

const userController = require('./user-controller');
var UserSchema = require('./user');

describe('User- Controller', function () {

    this.afterEach(function () {
        sinon.restore();
    });

    describe('Find user By Id', function (done) {
        let userId = '123456789';
        let token = 'abcdef';

        let user = {
            nome: 'concrete',
            senha: '123456'
        };

        it('Find user passing a valid id', function (done) {

            sinon.stub(UserSchema, 'findById').returns(user);
            let promiseUser = userController.findUser(userId, token);

            UserSchema.findById.calledOnce.should.be.true();
            UserSchema.findById.calledWith(userId).should.be.true();

            promiseUser.should.eventually.equal(user);
            done();
        });

        it('Try to find user passing a non-existing id', function (done) {

            sinon.stub(UserSchema, 'findById').returns(null);

            let promiseException = userController.findUser('789', token);
            promiseException.should.be.rejected;

            UserSchema.findById.calledOnce.should.be.true();
            UserSchema.findById.calledWith('789').should.be.true();

            done();
        });

        it('Try to find user passing a invalid token', function (done) {

            sinon.stub(UserSchema, 'findById').returns(user);

            let promiseException = userController.findUser(userId, 'some token');
            promiseException.should.be.rejected;

            UserSchema.findById.calledOnce.should.be.true();
            UserSchema.findById.calledWith(userId).should.be.true();

            done();
        });

    });
});