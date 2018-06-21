/* contains user schema */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltFactor = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    }
});

// before inserting password into db.
UserSchema.pre('save', function(next) {
    const user = this;
    if (user.password === undefined) {
        return next(err);
    }


    //hash password only if it is modified or new.
    if(! user.isModified('password')){
        return next();
    }

    bcrypt.hash( user.password, saltFactor)
    .then((hash)=> {
        user.password = hash;
        return next();
    }, (err)=> {
        return next(err);
    });
});

// matching of password
UserSchema.methods.comparePassword = function(plainPassword, next) {
    bcrypt.compare(plainPassword, this.password)
        .then((result)=> {
            next(null, result);
        })
        .catch((err)=> {
            return next(err);
        });
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
