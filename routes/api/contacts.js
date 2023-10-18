const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contacts.getContactByID(id);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const result = await contacts.addContact(newContact);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contacts.removeContact(id);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
