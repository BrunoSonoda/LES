export default (req, res, next) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({
      errors: ['Acesso proibido: Esta área é restrita a administradores.'],
    });
  }
  return next();
};
