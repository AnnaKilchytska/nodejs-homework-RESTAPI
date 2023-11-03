const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    const error = new Error();
    error.status = 400;
    error.message = `id ${id} is not a valid id`;
    return next(error);
  }
  next();
};

module.exports = isValidId;
