import jwt from 'jsonwebtoken';
import config from '../config/config';

export  function decodeSub(req, res, next) {
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, config.jwtSecret);
        decoded.id = decoded.sub;
        delete decoded.sub;
        req.user = decoded;
        next()
    } catch (e){
        req.user = null;
        next()
    }

}