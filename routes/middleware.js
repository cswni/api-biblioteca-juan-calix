import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send('Necesitas iniciar sesión para acceder a la API.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send('No se ha proporcionado un token de acceso.');
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido o sesión expirada.');
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;
