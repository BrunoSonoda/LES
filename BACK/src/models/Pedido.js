import Sequelize, { Model } from 'sequelize';

export default class Pedido extends Model {
  static init(sequelize) {
    super.init({
      status: {
        type: Sequelize.ENUM('EM PROCESSAMENTO', 'APROVADA', 'REPROVADA', 'EM TRANSPORTE', 'ENTREGUE'),
        defaultValue: 'EM PROCESSAMENTO',
      },
      valor_total: Sequelize.DECIMAL(10, 2),
      frete: Sequelize.DECIMAL(10, 2),
    }, {
      sequelize,
      tableName: 'pedidos',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
    this.belongsTo(models.Endereco, { foreignKey: 'endereco_id' });
    this.hasMany(models.PedidoItem, { foreignKey: 'pedido_id', as: 'itens' });
  }
}
