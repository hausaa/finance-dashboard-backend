const { validationResult } = require("express-validator");

exports.validate = (req, response, next) => {

const errors = validationResult(req);

if (!errors.isEmpty()) {
    return response.status(400).json({
        success: false,
        errors: errors.array()
    });
}

next();
};