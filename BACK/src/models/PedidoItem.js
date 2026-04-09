import Sequelize, { Model } from 'sequelize';

export default class PedidoItem extends Model {
  static init(sequelize) {
    super.init({
      quantidade: Sequelize.INTEGER,
      valor_unitario: Sequelize.DECIMAL(10, 2),
    }, {
      sequelize,
      tableName: 'pedido_itens',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pedido, { foreignKey: 'pedido_id' });
    this.belongsTo(models.Camiseta, { foreignKey: 'camiseta_id' });
  }
}
