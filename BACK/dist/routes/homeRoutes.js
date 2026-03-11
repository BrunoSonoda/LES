Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _express = require('express');
const _HomeController = require('../controllers/HomeController');

const _HomeController2 = _interopRequireDefault(_HomeController);

const router = new (0, _express.Router)();

router.get('/', _HomeController2.default.index);

exports.default = router;
