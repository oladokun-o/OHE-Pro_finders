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


supportUserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(salt, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                user.password2 = hash;
                next();
            })

        })
    } else {
        next();
    }
});

supportUserSchema.methods.comparepassword = function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
    // generate token

supportUserSchema.methods.generateToken = function(cb) {
        var user = this;
        var token = jwt.sign(user._id.toHexString(), confiq.SECRET);
            
        user.token = token;
        user.save(function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    }
    // find by token
supportUserSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, confiq.SECRET, function(err, decode) {
        user.findOne({ "_id": decode, "token": token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}; //delete token

supportUserSchema.methods.deleteToken = function(token, cb) {
    var user = this;

    user.update({ $unset: { token: 1 } }, function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}
supportUserSchema.statics.emailCheck = function(email, cb) {
    // replaced req.body.email with email
    var user = this;
    user.findOne({ email: email }, function(err, user) {
        if (err) return cb(err);
        // Pass user to callback and handle whether email exist in the callback.
        cb(null, user);
    });
};

supportUserSchema.statics.idCheck = function(id, cb) {
    // replaced req.body.email with email
    var user = this;
    user.findOne({ id: id }, function(err, user) {
        if (err) return cb(err);
        // Pass user to callback and handle whether email exist in the callback.
        cb(null, user);
    });
};

supportUserSchema.statics.idEmailCheck = function(id, email, cb) {
    // replaced req.body.email with email
    var user = this;
    user.findOne({ id: id, email: email }, function(err, user) {
        if (err) return cb(err);
        // Pass user to callback and handle whether email exist in the callback.
        cb(null, user);
    });
};
supportUserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
    };

    return jwt.sign(payload, confiq.SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

supportUserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

supportUserSchema.methods.generateEmailUpdate = function() {
    this.updateEmailToken = crypto.randomBytes(20).toString('hex');
    this.updateEmailExpires = Date.now() + 3600000; //expires in an hour
};


mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Support', supportUserSchema);