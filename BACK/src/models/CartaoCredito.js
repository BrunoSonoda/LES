import Sequelize, { Model } from 'sequelize';

export default class CartaoCredito extends Model {
  static init(sequelize) {
    super.init({
      // RN0024: Composição do registro de cartões
      numero_cartao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          creditCard: { msg: 'Número de cartão inválido.' },
        },
      },
      nome_impresso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bandeira: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigo_seguranca: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      // RF0027: Configurar como preferencial
      is_preferencial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      tableName: 'cartoes_credito',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });
  }
}
