'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unique = require('mongoose-unique-validator');
const validators = require('mongoose-validators');

const mensagem_campo_obrigatorio = '{PATH} é um campo obrigatório';
const mensagem_valor = '{VALUE} não é {PATH} válido';




let userSchema = Schema({
    nome: {
        type: String,
        require: [true, mensagem_campo_obrigatorio]
    },

    email: {
        type: String,
        unique: true,
        require: [true, mensagem_campo_obrigatorio],
        validate: validators.isEmail({ message: '{VALUE} não é um {PATH} válido' })
    },
    senha: {
        type: String,
        require: [true, mensagem_campo_obrigatorio]
    },
    telefones: [{
        numero: String,
        ddd: String
    }],
    dataCriacao: { type: Date, default: Date.now },
    dataAtualizacao: { type: Date, default: Date.now },
    ultimoLogin: { type: Date, default: Date.now },
    token: String
});

if (userSchema.options) {
    userSchema.options.toJSON = {
        transform: function (doc, ret, options) {
            delete ret.telefones;
            delete ret.email;
            delete ret.senha;
            delete ret.__v;
            return ret;
        }
    };
}


userSchema.plugin(unique, { message: '{PATH} já existente' });

userSchema.statics.findOneByField = function (field, value) {
    return this.findOne({ field: value });

}

userSchema.statics.findByIdAndUpdate = function (_id, _token) {

    return this.findByIdAndUpdate({ '_id': _id },
        {
            $set:
                { ultimo_login: Date.now(), token: _token }
        }, { new: true });
}


mongoose.model('User', userSchema);
module.exports = mongoose.model('User');