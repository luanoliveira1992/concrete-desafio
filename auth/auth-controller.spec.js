const chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require("sinon-chai")
chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const authController = require('./auth-controller');
const UserDao = require('../user/user-DAO');
const bcrypt = require('bcrypt');

describe('Auth - Controller', function () {

    this.afterEach(function () {
        sinon.restore();
    });

    describe('Login User', function (done) {

        let _email = 'concrete@concrete.com';
        let _senha = '123456';

        let user = {
            nome: 'concrete',
            senha: _senha,
            email: _email
        };

        it('Find user a valid user by valid email', function (done) {

            let userDaofindStub = sinon.stub(UserDao.prototype, 'findByEmail').returns(user);
            let userDaoUpdatetub = sinon.stub(UserDao.prototype, 'updateLastLoginUser').returns(user);
            sinon.stub(bcrypt, 'compare').returns(true);

            let promiseUser = authController.findAnValidUserByEmail(_email, _senha);

            userDaofindStub.calledOnce.should.be.true();
            userDaofindStub.calledWith(_email).should.be.true();

            promiseUser.should.eventually.equal(user);
            done();
        });

        it('Try to find user passing a non-existing Email', function (done) {

            let userDaofindStub = sinon.stub(UserDao.prototype, 'findByEmail').returns(null);

            let promiseUser = authController.findAnValidUserByEmail('non@non.com', _senha);

            promiseUser.should.be.rejected;
            userDaofindStub.calledOnce.should.be.true();
            userDaofindStub.calledWith('non@non.com').should.be.true();
            done();
        });

        it('Try to find user passing a invalid password', function (done) {

            let userDaofindStub = sinon.stub(UserDao.prototype, 'findByEmail').returns(user);
            sinon.stub(bcrypt, 'compare').returns(false);

            let promiseUser = authController.findAnValidUserByEmail(_email, 'anypass');
            promiseUser.should.be.rejected;

            userDaofindStub.calledOnce.should.be.true();
            userDaofindStub.calledWith(_email).should.be.true();

            done();
        });


    });
});