import { Op } from 'sequelize';
import Cliente from '../models/Cliente';

class ClienteController {
  // RF0021: Cadastrar cliente
  async store(req, res) {
    try {
      const { password, password_confirmation } = req.body;

      // RNF0032: Confirmação de senha
      if (password !== password_confirmation) {
        return res.status(400).json({
          errors: ['A confirmação de senha não coincide com a senha.'],
        });
      }

      const novoCliente = await Cliente.create(req.body);

      // Retornando campos essenciais conforme RF0021/RN0026
      const {
        id, nome, email, cpf, ranking,
      } = novoCliente;
      return res.json({
        id, nome, email, cpf, ranking,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || [e.message],
      });
    }
  }

  // RF0024: Consulta de clientes com filtros combinados ou isolados
  async index(req, res) {
    try {
      const {
        nome, email, cpf, genero, ativo,
      } = req.query;
      const where = {};

      // Construção dinâmica de filtros
      if (nome) where.nome = { [Op.like]: `%${nome}%` };
      if (email) where.email = { [Op.like]: `%${email}%` };
      if (cpf) where.cpf = cpf;
      if (genero) where.genero = genero;
      if (ativo !== undefined) where.ativo = ativo === 'true';

      const clientes = await Cliente.findAll({
        where,
        attributes: ['id', 'nome', 'email', 'cpf', 'genero', 'ranking', 'ativo'],
        order: [['nome', 'ASC']],
      });

      return res.json(clientes);
    } catch (e) {
      return res.status(500).json({ errors: ['Erro interno ao buscar clientes'] });
    }
  }

  // Consulta individual
  async show(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(404).json({ errors: ['Cliente não encontrado'] });

      const {
        id, nome, email, cpf, genero, data_nascimento, tel_ddd, tel_numero, ranking, ativo,
      } = cliente;
      return res.json({
        id, nome, email, cpf, genero, data_nascimento, tel_ddd, tel_numero, ranking, ativo,
      });
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // RF0022 & RF0028: Alterar cliente / Alteração apenas de senha
  async update(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);

      if (!cliente) {
        return res.status(400).json({ errors: ['Cliente não existe'] });
      }

      // Lógica para RNF0032 se a senha estiver sendo alterada
      if (req.body.password && req.body.password !== req.body.password_confirmation) {
        return res.status(400).json({ errors: ['Confirmação de senha não confere'] });
      }

      const novosDados = await cliente.update(req.body);
      const {
        id, nome, email, ranking,
      } = novosDados;

      return res.json({
        id, nome, email, ranking,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || [e.message],
      });
    }
  }

  // RF0023: Inativar cadastro de cliente (Soft Delete/Status)
  async delete(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);

      if (!cliente) {
        return res.status(400).json({ errors: ['Cliente não existe'] });
      }

      // Em vez de destruir (user.destroy), alteramos o status conforme requisito
      await cliente.update({ ativo: false });

      return res.json({ message: 'Cliente inativado com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors?.map((err) => err.message) || [e.message],
      });
    }
  }
}

export default new ClienteController();
