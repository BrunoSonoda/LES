import Sequelize, { Model } from 'sequelize';

export default class Cupom extends Model {
  static init(sequelize) {
    super.init({
      // Código identificador (ex: NATAL10 ou TRC-12345)
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('PROMOCIONAL', 'TROCA'),
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      data_validade: {
        type: Sequelize.DATE,
        allowNull: true, // Cupons de troca podem não ter validade exposta
      },
    }, {
      sequelize,
      tableName: 'cupons',
    });

    return this;
  }

  static associate(models) {
    // RN0036: Cupons de troca são vinculados a um cliente
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
  }
}
