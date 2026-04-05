import { Router } from 'express';
import tokenController from '../controllers/TokenController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Rota de Login (Gera o Token)
router.post('/', tokenController.store);

// Rota de Validação (Checa se o usuário ainda está logado)
router.get('/', loginRequired, tokenController.index);

export default router;
