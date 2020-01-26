import { Router } from 'express';

import sessionController from './app/controllers/SessionController';
import studentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.get('/', (req, res) => {
  res.json({ message: 'ola Mundo' });
});

// cria a sessão de login
router.post('/session', sessionController.store);

// middleware que realiza autenticação so passa se o usuario for admin
router.use(authMiddleware);
// cadastro de studantes
router.post('/student', studentController.store);

export default router;
