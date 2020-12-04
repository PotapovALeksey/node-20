const fs = require('fs').promises;
const path = require('path');
const { handleError } = require('../utils/handleError');

const contactPath = path.join(__dirname, '../db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactPath);

    return JSON.parse(contacts.toString());
  } catch (e) {
    handleError(e);
  }
}

async function getContactById(id) {
  const contacts = await listContacts();

  return contacts?.find(c => c.id === id);
}

async function removeContact(id) {
  const contacts = await listContacts();
  const newContacts = contacts?.filter(c => c.id !== id);
  try {
    if (newContacts) {
      await fs.writeFile(contactPath, JSON.stringify(newContacts));
      console.log(`Remove contact by id: ${id}`);
    }
  } catch (e) {
    handleError(e);
  }
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    ...contact,
  }
  contacts?.push(newContact);
  try {
    if (contacts) {
      await fs.writeFile(contactPath, JSON.stringify(contacts));
      console.log(`Added new contact ${JSON.stringify(newContact)}`);
    }
  } catch (e) {
    handleError(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
