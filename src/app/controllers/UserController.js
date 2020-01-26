import User from '../models/User';

class UserController {
  // metodo para cadastrar usuarios
  async store(req, res) {
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
