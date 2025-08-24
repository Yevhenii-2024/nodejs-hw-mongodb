import {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { buildContactFilters } from '../utils/buildContactFilters.js';

export const getContactsController = async (req, res) => {
  const { page, perPage, sortBy, sortOrder } = req.validQuery;

  const data = await getAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    buildContactFilters(req.validQuery),
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContact(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const createdContact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const payload = req.body;

  const updatedContact = await updateContact(contactId, payload);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
