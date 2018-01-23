import jwt from 'jsonwebtoken';
import config from '../config/config';

export  function jwtAuth(req, res, next) {
    // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, config.jwtSecret);
        decoded.id = decoded.sub;
        delete decoded.sub;
        req.user = decoded;
        next();
    } catch (e){
        res.status(401).send({
            success: false,
            error: e.message
        })
    }

}