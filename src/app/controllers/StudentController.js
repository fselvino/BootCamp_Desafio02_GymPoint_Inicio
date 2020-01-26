import * as yup from 'yup';

import Student from '../models/Student';

class StudentController {
  // meto para cadastrar estudantes no banco
  async store(req, res) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .integer()
        .required(),
      weight: yup.number().required(),
      height: yup.number().required(),
    });

    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Store Session fails' });
    }

    // realiza consulta no banco com os parametros vindos da requisiçao
    const StudentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    // se existir estudante cadastrado com mesmo email retorna erro
    if (StudentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    // cadastra alunos da tabela students
    const { name, email, age, weight, height } = await Student.create(req.body);
    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }

  // metodo para Atualizar os Studantes
  async update(req, res, next) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .integer()
        .required(),
      weight: yup.number().required(),
      height: yup.number().required(),
    });

    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Store Session fails' });
    }
    const { email } = req.body;
    // bloco que realiza a verificaçao do email repassado paara consulta
    // se existir studante ser realizado atualizaçao senao retorna erro
    try {
      const student = await Student.findOne({ where: { email } });
      const { id, name, age, weight, height } = await student.update(req.body);

      return res.json({
        id,
        name,
        age,
        weight,
        height,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Email inexistente' });
    }
  }
}

export default new StudentController();
