import { Router } from 'express';

const router = new Router();
router.get('/', (req, res) => {
  res.json({ message: 'ola Mundo' });
});
export default router;
