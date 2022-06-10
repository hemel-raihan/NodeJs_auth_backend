const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) =>{
    const {authorization} = req.headers;

    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, "secret")
        const {_id} = decoded
        req._id = _id
        next()
    } catch(e){
        next("Authentication Failure!!!")
    }
}

module.exports = checkLogin;