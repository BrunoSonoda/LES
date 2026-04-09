import Sequelize, { Model } from 'sequelize';

export default class Camiseta extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'O nome da camiseta é obrigatório.' } },
      },
      descricao: Sequelize.TEXT,
      categoria: Sequelize.STRING, // Ex: Anime, Geek, Casual
      tamanho: Sequelize.ENUM('PP', 'P', 'M', 'G', 'GG', 'XG'),
      cor: Sequelize.STRING,
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantidade_estoque: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      tableName: 'camisetas',
    });

    return this;
  }
}
