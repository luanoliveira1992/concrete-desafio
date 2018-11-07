const chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    should = require('should');
    chaiAsPromised = require('chai-as-promised'),
    sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.use(chaiAsPromised);

const UserDao = require('./user-DAO');

const UserSchema = require('./user');
const bcrypt = require('bcrypt');
const jwt = require('../jwt/handler');

describe('User-DAO', function () {
    let userDao;

    beforeEach(function () {
        userDao = new UserDao();
    });

    this.afterEach(function () {
        sinon.restore();
    })

    describe('find-by-email', function () {
        it('query a user by email', function () {

            let findOneResult = { nome: 'concrete', email: 'concrete@concrete.com' };
            sinon.stub(UserSchema, 'findOne').returns(findOneResult);
            let promiseResult = userDao.findByEmail('concrete@concrete.com');

            UserSchema.findOne.calledOnce.should.be.true();
            UserSchema.findOne.calledWith({ email: 'concrete@concrete.com' }).should.be.true();

            promiseResult.then(user => {
                expect(findOneResult).to.equal(user);

            });

        });
    });

    describe('update-Last-Login-User', function () {
        it('update the Last Login User', function () {

            let userObject = { senha: 'concrete', email: 'concrete@concrete.com' };
            sinon.stub(UserSchema, 'findOneAndUpdate').returns(userObject);
            sinon.stub(jwt, 'getToken').returns('token');

            let promiseResult = userDao.updateLastLoginUser(userObject);

            UserSchema.findOneAndUpdate.calledOnce.should.be.true();

            promiseResult.should.eventually.equal(userObject);
        });
    });

    describe('create-an-User', function () {

        let body;
        let hashedPassword = 'concrete_rlfo';
        let userToken = 'rlfo_concrete';

        it('Create a User', function () {

            let body = {
                id: '123456789',
                email: 'concrete@concrete.com',
            };

            let bodyResult = {
                id: '123456789',
                nome: 'concrete',
                email: 'concrete@concrete.com',
                senha: hashedPassword,
                token: userToken
            };

            let userStub = sinon.stub(UserSchema.prototype, 'save').returns(bodyResult);

            sinon.stub(bcrypt, 'hashSync').returns(hashedPassword);
            sinon.stub(jwt, 'getToken').returns(userToken);

            let promiseResult = userDao.createUser(body);

            userStub.calledOnce.should.be.true();

            promiseResult.should.eventually.equal(bodyResult);
        });
    });

});