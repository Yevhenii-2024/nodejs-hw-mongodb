import { ContactCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContact = async (id) => {
  const contact = await ContactCollection.findById(id);
  return contact;
};
