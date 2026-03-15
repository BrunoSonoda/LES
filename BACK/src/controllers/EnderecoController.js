import Endereco from '../models/Endereco';

class EnderecoController {
  // RF0026: Cadastro de novos endereços associados ao cliente
  async store(req, res) {
    try {
      // O cliente_id deve vir do middleware de autenticação (req.userId)
      // ou ser passado no corpo/parâmetro dependendo da sua arquitetura.
      const { cliente_id } = req.body;

      const novoEndereco = await Endereco.create(req.body);
      return res.json(novoEndereco);
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || ['Erro ao cadastrar endereço.'],
      });
    }
  }

  // RF0035: Lista todos os endereços de um cliente específico
  async index(req, res) {
    try {
      const { cliente_id } = req.params;

      if (!cliente_id) {
        return res.status(400).json({ errors: ['ID do cliente não fornecido.'] });
      }

      const enderecos = await Endereco.findAll({
        where: { cliente_id },
        order: [['id', 'DESC']],
      });

      return res.json(enderecos);
    } catch (e) {
      return res.status(500).json({ errors: ['Erro ao buscar endereços.'] });
    }
  }

  // Consulta individual de um endereço
  async show(req, res) {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findByPk(id);

      if (!endereco) {
        return res.status(404).json({ errors: ['Endereço não encontrado.'] });
      }

      return res.json(endereco);
    } catch (e) {
      return res.status(400).json({ errors: ['ID inválido.'] });
    }
  }

  // RF0034: Alteração apenas de endereço de forma simples
  async update(req, res) {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findByPk(id);

      if (!endereco) {
        return res.status(404).json({ errors: ['Endereço não existe.'] });
      }

      const enderecoAtualizado = await endereco.update(req.body);
      return res.json(enderecoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || ['Erro ao atualizar endereço.'],
      });
    }
  }

  // Remoção de endereço
  async delete(req, res) {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findByPk(id);

      if (!endereco) {
        return res.status(404).json({ errors: ['Endereço não existe.'] });
      }

      await endereco.destroy();
      return res.json({ message: 'Endereço removido com sucesso.' });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao remover endereço.'] });
    }
  }
}

export default new EnderecoController();
