const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    authenticateToken: authenticateToken
}

//生成jwt
function generateToken(username, role) {
    const payload = {
        username: username,
        role: role
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
}

//验证jwt
async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        console.log("decoded", decoded);
        return decoded;
    } catch (err) {
        return null;
    }
}

//中间件
async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });


}