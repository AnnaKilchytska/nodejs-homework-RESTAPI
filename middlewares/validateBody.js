const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { err } = schema.validate(req.body);
    if (err) {
      const error = new Error();
      error.status = 400;
      return next(error);
    }
    next();
  };

  return func;
};

module.exports = validateBody;
