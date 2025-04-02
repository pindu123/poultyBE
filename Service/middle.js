 const jsonwebtoken = require('jsonwebtoken');
const secret_key = process.env.secretKey;
 const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        console.log("token required");
        return res.status(401).send({ status: false, message: "Token required" });
    }

    jsonwebtoken.verify(token, secret_key, (err, decoded) => {
         if (err) return res.status(403).json({ message: "Update the token" ,error: err});
        req.user = decoded;
        next();
    });
};

 module.exports = { verifyJwt };
