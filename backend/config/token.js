import jwt from 'jsonwebtoken';
import {ENV} from './env.js';

const generateToken =(id)=>{
    const token= jwt.sign({id}, ENV.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
}

export default generateToken;