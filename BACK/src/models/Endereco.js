import Sequelize, { Model } from 'sequelize';

export default class Endereco extends Model {
  static init(sequelize) {
    super.init({
      // RF0026: Identificação do endereço (ex: "Minha Casa", "Trabalho")
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'A descrição do endereço é obrigatória.' } },
      },
      // RN0023: Composição do registro
      tipo_residencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pais: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // Diferenciação para RN0021 e RN0022
      tipo_endereco: {
        type: Sequelize.ENUM('ENTREGA', 'COBRANCA', 'AMBOS'),
        defaultValue: 'ENTREGA',
      },
    }, {
      sequelize,
      tableName: 'enderecos',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
  }
}
