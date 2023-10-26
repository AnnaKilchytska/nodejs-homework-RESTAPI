const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const bodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemas = {
  bodySchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
  schemas,
};
