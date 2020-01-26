import Student from '../models/Student';

class StudentController {
  // meto para cadastrar estudantes no banco
  async store(req, res) {
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
}

export default new StudentController();
