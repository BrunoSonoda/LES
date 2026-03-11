function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _sequelize = require('sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);
const _database = require('../config/database');

const _database2 = _interopRequireDefault(_database);
const _Aluno = require('../models/Aluno');

const _Aluno2 = _interopRequireDefault(_Aluno);
const _User = require('../models/User');

const _User2 = _interopRequireDefault(_User);
const _Foto = require('../models/Foto');

const _Foto2 = _interopRequireDefault(_Foto);

const models = [_Aluno2.default, _User2.default, _Foto2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
