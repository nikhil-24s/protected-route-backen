const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ status: false, message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ status: false, message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ status: false, message: 'Unauthorized: Invalid token', error: error.message });
    }
};

module.exports = isAuth;
