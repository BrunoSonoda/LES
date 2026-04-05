import jwt from 'jsonwebtoken';
import Cliente from '../models/Cliente'; // Alterado para o novo model

class TokenController {
  // RF0025: Verifica se a sessão é válida e retorna o papel do usuário
  index(req, res) {
    res.json({
      valid: true,
      id: req.userId,
      role: req.userRole, // Informação vinda do middleware
    });
  }

  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await cliente.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    // Extraímos o 'role' para o payload do token
    const { id, nome, role } = cliente;

    // Gerando o token com o ID, Email e Role
    const token = jwt.sign(
      { id, email, role },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    // Retornamos a role também no JSON para o Front-end decidir o que exibir
    return res.json({
      token,
      user: { id, nome, email, role }
    });
  }
}

export default new TokenController();
