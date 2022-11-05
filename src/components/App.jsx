import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { nanoid } from 'nanoid';
import css from 'components/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const normalizedFilter = name.toLowerCase();
    const checkByName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    if (checkByName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(10),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <section className={css.phonebook}>
        <div className={css.phonebookWrap}>
          <h1 className={css.phonebookTitle}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </div>

        <div className={css.contactsWrap}>
          <h2 className={css.phonebookTitle}>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.changeFilter} />

          <ContactList
            contacts={this.getFiltredContacts()}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </section>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
  }),
};
