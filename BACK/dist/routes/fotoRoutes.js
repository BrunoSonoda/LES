Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _express = require('express');

const _FotoController = require('../controllers/FotoController');

const _FotoController2 = _interopRequireDefault(_FotoController);
const _loginRequired = require('../middlewares/loginRequired');

const _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _FotoController2.default.store);

exports.default = router;
