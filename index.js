const argv = require('yargs').argv;
const contactMethods = require('./module/contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list': {
      return console.table(await contactMethods.listContacts());
    }
    case 'get': {
      return console.log(await contactMethods.getContactById(id));
    }
    case 'add': {
      return contactMethods.addContact({ name, email, phone });
    }
    case 'remove': {
      return contactMethods.removeContact(id);
    }
    default: {
      console.warn('\x1B[31m Unknown action type!');
    }
  }
}

invokeAction(argv);
