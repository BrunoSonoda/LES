import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import CartaoCredito from '../models/CartaoCredito';

const models = [Cliente, Endereco, CartaoCredito];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
