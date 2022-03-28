const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const headers = req.headers["authorization"];
    if (headers) {
        try {
            const token = headers.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decoded) {
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                console.log("Authenticated")
                next();
            } else {
                res.redirect('/')
            }
        } catch {
            res.json({ success: false, message: 'Not Authenticated' })
        }
    } else {

        res.redirect('/')
    }
}


module.exports = verifyJWT