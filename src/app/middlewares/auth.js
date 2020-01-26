import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// middleware que realiza autenticaçao dos usuarios
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // recebe o token vindo da requisiçao
  const authHeader = req.headers.authorization;
  // se não estiver correto retorna erro
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not Provided' });
  }
  // separa as partes do token
  const [, token] = authHeader.split(' ');

  try {
    // realializa a decodificaçao do token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // repassa o id vindo pelo toquem para a requisiçao
    req.userId = decoded.id;
    // console.log(decoded.admin);
    // se nao for administrador retorna erro
    if (!decoded.admin) {
      return res.status(400).json({ error: 'Not Permission register' });
    }
    // não sendo erro da prosseguimento ao programa
    return next();
    // se algo der errado retorna erro
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
