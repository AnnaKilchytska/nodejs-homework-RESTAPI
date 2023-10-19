const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contacts = require("../../models/contacts");

const bodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  id: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactByID(id);

    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = bodySchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const newContact = req.body;
    const result = await contacts.addContact(newContact);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: error.message,
      code: 400,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) throw new Error("Couldn't remove contact");

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) throw new Error("Missing fields");
    const { error } = bodySchema.validate(req.body);
    if (error) throw new Error(error.message);
    const updatedContacts = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContacts,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
