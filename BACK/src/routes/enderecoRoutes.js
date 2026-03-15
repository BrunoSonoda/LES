import { Router } from 'express';

import EnderecoController from '../controllers/EnderecoController';

const routes = new Router();

routes.post('/enderecos', EnderecoController.store);
routes.get('/clientes/:cliente_id/enderecos', EnderecoController.index);
routes.get('/enderecos/:id', EnderecoController.show);
routes.put('/enderecos/:id', EnderecoController.update);
routes.delete('/enderecos/:id', EnderecoController.delete);

export default routes;
