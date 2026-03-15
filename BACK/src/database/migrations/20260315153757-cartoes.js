module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartoes_credito', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      numero_cartao: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      nome_impresso: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      bandeira: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      validade_mes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      validade_ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      preferencial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cartoes_credito');
  },
};
