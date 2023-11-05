const express = require("express");

const router = express.Router();
const controlContacts = require("../../controllers/contacts");
const { schemas } = require("../../service/schemas/contacts");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", controlContacts.listContacts);

router.get("/:id", isValidId, controlContacts.getContactByID);

router.post("/", validateBody(schemas.bodySchema), controlContacts.addContact);

router.delete("/:id", isValidId, controlContacts.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.bodySchema),
  controlContacts.updateContact
);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controlContacts.updateStatus
);

module.exports = router;
