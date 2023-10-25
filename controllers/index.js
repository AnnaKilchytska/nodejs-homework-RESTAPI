const service = require("../service/index");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getContactByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getContactByID(id);

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
    console.log(error.message);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await service.removeContact(id);
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
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await service.addContact(req.body);

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
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.updateContact(id);

    if (!result) throw new Error("Couldn't remove contact");

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listContacts,
  getContactByID,
  removeContact,
  addContact,
  updateContact,
};
