// const { Contact } = require("../service/schemas/contacts");

// const listContacts = async (data) => {
//   return Contact.find(data, "-createAt -updateAt").populate(
//     "owner",
//     "name email"
//   );
// };

// const getContactByID = async (id) => {
//   return Contact.findOne({ _id: id });
// };

// const removeContact = async (id) => {
//   return Contact.findByIdAndRemove({ _id: id });
// };

// const addContact = async (data) => {
//   return Contact.create(data);
// };

// const updateContact = async (id, data) => {
//   return Contact.findByIdAndUpdate(id, data, { new: true });
// };

module.exports = {
  // listContacts,
  // getContactByID,
  // removeContact,
  // addContact,
  // updateContact,
};
