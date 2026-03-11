Object.defineProperty(exports, '__esModule', { value: true }); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } const _multer = require('multer');

const _multer2 = _interopRequireDefault(_multer);
const _multerConfig = require('../config/multerConfig');

const _multerConfig2 = _interopRequireDefault(_multerConfig);

const _Foto = require('../models/Foto');

const _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await _Foto2.default.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

exports.default = new FotoController();
