import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import dotenv from 'dotenv';
dotenv.config();

const loginUser = (data) => {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
       const sql = 'SELECT id_usuario,nombre,correo_electronico,password FROM usuarios WHERE correo_electronico = ? LIMIT 1';

       config.query(sql, [email], async (err, filas) => {
           console.log(filas)
           if (err) {
               console.log(err);
               reject(err);
           } else if (filas.length > 0) {
               const usuario = filas[0];
               // Compare the password
               const passwordCompareResult = bcrypt.compare(password, usuario.password);
               if (!passwordCompareResult) {
                   reject('Email o contraseña incorrectos');
               }
               const token = await jwt.sign({
                   id: usuario.id_usuario,
                   email: usuario.correo_electronico,
                   name: usuario.nombre
               }, process.env.SECRET_TOKEN);
               resolve(token);
           } else {
               reject('Usuario no encontrado');
           }
       });
    });
}

export {
    loginUser
}
