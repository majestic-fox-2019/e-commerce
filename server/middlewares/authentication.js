const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const user = jwt.verify(token, "wiesoo");
        req.user = user;
        next();
    } catch (error) {
        console.log(1234);
        res.status(404).json({ message: "token is invalid" });
    }
};
