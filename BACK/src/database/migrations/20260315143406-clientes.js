/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

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

      ranking: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('clientes');
  },
};
