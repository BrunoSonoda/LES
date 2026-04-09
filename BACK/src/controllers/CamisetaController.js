import Camiseta from '../models/Camiseta';

class CamisetaController {
  // RF0011: Cadastrar Camiseta (ADMIN)
  async store(req, res) {
    try {
      const novaCamiseta = await Camiseta.create(req.body);
      return res.json(novaCamiseta);
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao cadastrar produto.'] });
    }
  }

  // RF0014: Listar Camisetas (Público/Cliente)
  async index(req, res) {
    try {
      // Retorna apenas as camisetas ativas e com estoque (opcional)
      const camisetas = await Camiseta.findAll({
        where: { ativo: true },
        order: [['id', 'DESC']],
      });
      return res.json(camisetas);
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao buscar produtos.'] });
    }
  }

  // RF0015: Detalhes da Camiseta
  async show(req, res) {
    try {
      const camiseta = await Camiseta.findByPk(req.params.id);
      if (!camiseta) return res.status(404).json({ errors: ['Produto não encontrado.'] });
      return res.json(camiseta);
    } catch (e) {
      return res.status(400).json({ errors: ['ID inválido.'] });
    }
  }

  // RF0012: Alterar dados/Estoque (ADMIN)
  async update(req, res) {
    try {
      const camiseta = await Camiseta.findByPk(req.params.id);
      if (!camiseta) return res.status(404).json({ errors: ['Produto não existe.'] });

      const atualizada = await camiseta.update(req.body);
      return res.json(atualizada);
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao atualizar produto.'] });
    }
  }

  // RF0013: Inativar Camiseta (ADMIN)
  async delete(req, res) {
    try {
      const camiseta = await Camiseta.findByPk(req.params.id);
      if (!camiseta) return res.status(404).json({ errors: ['Produto não existe.'] });

      // Inativação lógica em vez de exclusão física
      await camiseta.update({ ativo: false });
      return res.json({ message: 'Produto inativado com sucesso.' });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao excluir produto.'] });
    }
  }
}

export default new CamisetaController();
