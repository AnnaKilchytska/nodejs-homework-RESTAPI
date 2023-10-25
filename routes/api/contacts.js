const express = require("express");
// const Joi = require("joi");

const router = express.Router();
const controlContacts = require("../../controllers/index");

// const bodySchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   id: Joi.string(),
// });

router.get("/", controlContacts.addContact);

router.get("/:contactId", controlContacts.getContactByID);

router.post("/", controlContacts.addContact);

router.delete("/:contactId", controlContacts.removeContact);

router.put("/:contactId", controlContacts.updateContact);

module.exports = router;
