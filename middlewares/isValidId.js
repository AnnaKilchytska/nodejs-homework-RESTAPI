const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HTTPError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!isValidObjectId(id)) {
    // const error = new Error();
    // error.status = 400;
    // error.message = `id ${id} is not a valid id`;
    // return next(error);
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
