const express = require("express");

const router = express.Router();
const controlContacts = require("../../controllers/contacts");
const { schemas } = require("../../models/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, controlContacts.listContacts);

router.get("/:id", authenticate, isValidId, controlContacts.getContactByID);

router.post(
  "/",
  authenticate,
  validateBody(schemas.bodySchema),
  controlContacts.addContact
);

router.delete("/:id", authenticate, isValidId, controlContacts.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.bodySchema),
  controlContacts.updateContact
);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controlContacts.updateStatus
);

module.exports = router;
