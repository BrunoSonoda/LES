import { Router } from 'express';
import CartaoCreditoController from '../controllers/CartaoCreditoController';

const router = new Router();

// RF0027: cadastrar cartão
router.post('/', CartaoCreditoController.store);

// listar cartões de um cliente
router.get('/cliente/:cliente_id', CartaoCreditoController.index);

// buscar cartão específico
router.get('/:id', CartaoCreditoController.show);

// atualizar cartão
router.put('/:id', CartaoCreditoController.update);

// remover cartão
router.delete('/:id', CartaoCreditoController.delete);

export default router;
