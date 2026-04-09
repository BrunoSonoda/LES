/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import crypto from 'crypto';

import Pedido from '../models/Pedido';
import Cupom from '../models/Cupom';
import Camiseta from '../models/Camiseta';

class TrocaController {
  // RF0043 & RF0044: Confirmar recebimento e gerar cupom
  async confirmarRecebimento(req, res) {
    try {
      const { pedido_id, itens_retornam_estoque } = req.body;

      const pedido = await Pedido.findByPk(pedido_id, {
        include: { association: 'itens' },
      });

      if (!pedido || pedido.status !== 'EM TROCA') {
        return res.status(400).json({ errors: ['Pedido não está em processo de troca.'] });
      }

      // 1. RF0043: Se os itens retornam ao estoque, atualizar quantidades
      if (itens_retornam_estoque) {
        for (const item of pedido.itens) {
          const camiseta = await Camiseta.findByPk(item.camiseta_id);
          await camiseta.update({
            quantidade_estoque: camiseta.quantidade_estoque + item.quantidade,
          });
        }
      }

      // 2. RF0044: Gerar cupom de troca com o valor do pedido
      const codigoCupom = `TRC-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

      const novoCupom = await Cupom.create({
        codigo: codigoCupom,
        valor: pedido.valor_total,
        tipo: 'TROCA',
        cliente_id: pedido.cliente_id,
        ativo: true,
      });

      // 3. RN0042: Atualizar status do pedido
      await pedido.update({ status: 'TROCADO' });

      return res.json({
        message: 'Troca finalizada e cupom gerado.',
        cupom: novoCupom.codigo,
        valor: novoCupom.valor,
      });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao processar troca.'] });
    }
  }
}

export default new TrocaController();
