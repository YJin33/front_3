const { request } = require("express");
const { User } = require("../models/User");
const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증처리하는 곳
    //클라이언트 쿠키에서 토큰을 가져온다
    //토큰을 복호화한 후 유저를 찾는다 
    //유저 유무 -> 인증
    let token = req.cookies.x_auth;
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })

}
module.exports = { auth }