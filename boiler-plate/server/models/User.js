const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5,

    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,

    },
    tokenExp: {
        type: Number
    }
})
userSchema.pre('save', function (next) {
    //비밀번호를 먼저 암호화한다
    var user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
                //hash: 암호화된 비밀번호
            })
        })
    }
    else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 12567 암호화된 비밀번호 $2b$10$QQ91SpoeV6BZcr2R0ASKgOPHtN9kLERv9uebOWosv2XF4jY.cD0.W
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err),
            cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function (cb) {
    //jsonwebtoken 이용

    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken'= token
    //     -> 
    //     'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}
userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // user._id + ' ' = token
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해 유저를 찾은 다음
        //클라이언트에서 가져오 token 과 db 호환된 토큰 일치 여부 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)
module.exports = { User }
