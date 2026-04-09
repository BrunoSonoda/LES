import { Router } from 'express';
import camisetaController from '../controllers/CamisetaController';
import loginRequired from '../middlewares/loginRequired';
import isAdmin from '../middlewares/isAdmin';

const router = new Router();

// Rotas Abertas: Clientes podem ver os produtos sem estar logados
router.get('/', camisetaController.index);
router.get('/:id', camisetaController.show);

// Rotas Protegidas: Apenas o ADMIN (Bruno) pode mexer no catálogo
router.post('/', loginRequired, isAdmin, camisetaController.store);
router.put('/:id', loginRequired, isAdmin, camisetaController.update);
router.delete('/:id', loginRequired, isAdmin, camisetaController.delete);

export default router;
