import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(404).json({ error: 'You are not authorized' })
                console.log(err)
            } else {
                next()
            }
        })
    } else {
        res.status(403).json({ error: 'You are not authorized' })
    }
}

export default requireAuth