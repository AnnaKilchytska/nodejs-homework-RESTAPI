// const service = require("../service/index");
const { Contact } = require("../service/schemas/contacts");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    console.log(req.query);
    const { page = 1, limit = 4 } = req.query;
    const skip = (page - 1) * limit;

    // const favorite = req.query.favorite;

    const contacts = await Contact.find({ owner }, "-createAt -updateAt", {
      skip,
      limit,
    }).populate("owner", "name email");

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
    const result = await Contact.findOne({ _id: id });

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

    const result = await Contact.findByIdAndRemove({ _id: id });
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
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
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
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

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

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);

    if (!result) throw new Error("Couldn't remove contact");

    res.json(result);
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
  updateStatus,
};
