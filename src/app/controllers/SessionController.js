import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // cria sessao no momento do login
  async store(req, res) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });
    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Store Session fails' });
    }
    // recebe as informaçoes de email e password do corpo da requisiçao
    const { email, password } = req.body;
    // realiza consulta verificando o email e se é  de administrador
    // linha abaixo e uma possibilidade onde o teste se é administrador e feito antes
    // const user = await User.findOne({ where: { email, admin: true } });
    const user = await User.findOne({ where: { email } });
    // se não for usuario cadastrado retorna erro
    if (!user) {
      return res.status(401).json({ error: 'User not Fount or Not Admin' });
    }

    // verifica se a senha esta correta se nao estiver retorna erro
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Passaword does not match' });
    }
    // recebe as informaçoes vindas do banco
    const { id, name, admin } = user;

    // chegou aqui e porque passou por todos testes e retorna as informaçoes
    return res.json({
      user: {
        id,
        name,
        email,
        admin,
      },
      toke: jwt.sign({ id, admin }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
