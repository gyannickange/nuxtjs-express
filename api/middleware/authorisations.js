// 401 Unauthorized
// 403 Forbidden 

exports.isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};

exports.isUser = async (req, res, next) => {
  if (!req.user.isUser) return res.status(403).send('Access denied.');

  next();
};

exports.isSuperAdmin = async (req, res, next) => {
  if (!req.user.isSuperAdmin) return res.status(403).send('Access denied.');

  next();
};