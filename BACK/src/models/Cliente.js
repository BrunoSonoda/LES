import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Cliente extends Model {
  static init(sequelize) {
    super.init({
      // RNF0035: Código de cliente (ID único)
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      // RN0026 & RN0029: E-mail único e obrigatório
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Este e-mail já está cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      // RN0026: Gênero, CPF e Data de Nascimento
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [11, 14],
        },
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      // RN0026: Telefone composto
      tel_tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel_ddd: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      tel_numero: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      // RN0027: Ranking do cliente
      ranking: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      // RF0023: Campo para controle de inativação
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      // RNF0031: Senha forte (8+ chars, Maiúsculas, Minúsculas e Especiais)
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          isStrong(value) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
            if (!regex.test(value)) {
              throw new Error(
                'A senha deve ter 8+ caracteres, incluindo maiúsculas, minúsculas e caracteres especiais',
              );
            }
          },
        },
      },
    }, {
      sequelize,
      tableName: 'clientes', // Alinhado ao grupo "Cadastro de Clientes"
      role: {
        type: Sequelize.ENUM('CLIENTE', 'ADMIN'),
        defaultValue: 'CLIENTE',
    },
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Endereco, { foreignKey: 'cliente_id', as: 'enderecos' });
    this.hasMany(models.CartaoCredito, { foreignKey: 'cliente_id', as: 'cartoes' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
