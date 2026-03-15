import CartaoCredito from '../models/CartaoCredito';

class CartaoCreditoController {
  // RF0027: cadastrar cartão para cliente
  async store(req, res) {
    try {
      const { cliente_id } = req.body;

      if (!cliente_id) {
        return res.status(400).json({
          errors: ['cliente_id é obrigatório'],
        });
      }

      const cartao = await CartaoCredito.create(req.body);

      return res.json(cartao);
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || ['Erro ao cadastrar cartão'],
      });
    }
  }

  // Listar cartões de um cliente
  async index(req, res) {
    try {
      const { cliente_id } = req.params;

      const cartoes = await CartaoCredito.findAll({
        where: { cliente_id },
        attributes: [
          'id',
          'numero_cartao',
          'nome_impresso',
          'bandeira',
          'is_preferencial',
        ],
      });

      return res.json(cartoes);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar cartões'],
      });
    }
  }

  // Buscar cartão específico
  async show(req, res) {
    try {
      const { id } = req.params;

      const cartao = await CartaoCredito.findByPk(id);

      if (!cartao) {
        return res.status(404).json({
          errors: ['Cartão não encontrado'],
        });
      }

      return res.json(cartao);
    } catch (e) {
      return res.status(400).json({
        errors: ['ID inválido'],
      });
    }
  }

  // Atualizar cartão
  async update(req, res) {
    try {
      const { id } = req.params;

      const cartao = await CartaoCredito.findByPk(id);

      if (!cartao) {
        return res.status(404).json({
          errors: ['Cartão não encontrado'],
        });
      }

      const cartaoAtualizado = await cartao.update(req.body);

      return res.json(cartaoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || ['Erro ao atualizar cartão'],
      });
    }
  }

  // Remover cartão
  async delete(req, res) {
    try {
      const { id } = req.params;

      const cartao = await CartaoCredito.findByPk(id);

      if (!cartao) {
        return res.status(404).json({
          errors: ['Cartão não encontrado'],
        });
      }

      await cartao.destroy();

      return res.json({
        message: 'Cartão removido com sucesso',
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro ao remover cartão'],
      });
    }
  }
}

export default new CartaoCreditoController();
