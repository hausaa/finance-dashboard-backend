const checkRole = (...roles) => {

return (req, answer, next) => {

if (!roles.includes(req.user.role)) {

return answer.status(403).json({
message: "You do not have permission"
});

}

next();

};

};

module.exports = checkRole;