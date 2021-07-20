var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const confiq = require('../config/index').get(process.env.NODE_ENV);
const salt = 10;
const crypto = require('crypto');
//const { uuid } = require('uuid');

const supportUserSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: false,

    },
    facebookId: {
        type: String,
        required: false,

    },
    firstname: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: false,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: false,
        minlength: 8
    },
    password2: {
        type: String,
        required: false,
        minlength: 8

    },
    token: {
        type: String
    },
    setChatRoomToken: {
        type: String,
        required: false
    },

    ChatRoomTokenExpires: {
        type: Date,
        required: false
    },
    updateEmailToken: {
        type: String,
        required: false
    },
    updateEmailExpires: {
        type: Date,
        required: false
    },
    type: {
        type: String,
    },
    },{
    timestamps: true,
    collection: "support",
})

supportUserSchema.methods.generateChatRoomToken = function() {
    this.setChatRoomToken = crypto.randomBytes(20).toString('hex');
    this.ChatRoomTokenExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Support', supportUserSchema);