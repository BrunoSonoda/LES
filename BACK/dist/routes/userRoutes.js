Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _express = require('express');
const _UserController = require('../controllers/UserController');

const _UserController2 = _interopRequireDefault(_UserController);

const _loginRequired = require('../middlewares/loginRequired');

const _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports.default = router;
