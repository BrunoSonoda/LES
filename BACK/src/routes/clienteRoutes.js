import { Router } from 'express';
import clienteController from '../controllers/ClienteController';

// import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// RF0024: Consulta de clientes (com filtros via query params no Controller)
router.get('/', clienteController.index);

// RF0021: Cadastrar cliente (Cadastro inicial)
router.post('/', clienteController.store);

// RF0024/RF0025: Consulta de dados detalhados de um cliente específico
router.get('/:id', clienteController.show);

// RF0022: Alterar dados cadastrais do cliente
router.put('/:id', clienteController.update);

// RF0028: Alteração apenas de senha
// (Focado exclusivamente na atualização da credencial)
router.patch('/password-update/:id', clienteController.update);

// RF0023: Inativar cadastro de cliente
// (O controller tratará como inativação lógica, não exclusão física)
router.delete('/:id', clienteController.delete);

export default router;
