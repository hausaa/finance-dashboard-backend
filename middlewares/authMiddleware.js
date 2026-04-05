const jwt = require("jsonwebtoken");

const authMiddleware = (req, answer, next) => {

try {

const token = req.headers.authorization?.split(" ")[1];

if (!token) {
    return answer.status(401).json({
        message: "Access denied. No token provided."
    });
}

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = decoded;

next();

} catch (error) {

return answer.status(401).json({
    message: "Invalid token"
});

}

};

module.exports = authMiddleware;