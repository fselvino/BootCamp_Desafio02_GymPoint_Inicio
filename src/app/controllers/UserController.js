import * as yup from 'yup';
import User from '../models/User';

class UserController {
  // metodo para cadastrar usuarios
  async store(req, res) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });

    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Store User fails' });
    }

    // realiza consulta no banco com os parametros vindos da requisiçao
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // se ja estiver cadastrado retorna erro
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // se passar persiste as informaçoes no banco
    const { id, name, email, admin } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}
export default new UserController();
