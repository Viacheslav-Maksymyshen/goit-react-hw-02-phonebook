import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleNameChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  repeatName = newName => {
    return this.state.contacts.find(({ name }) => name === newName);
  };

  deleteContact = oldName => {
    this.setState({
      contacts: this.state.contacts.filter(({ name }) => name !== oldName),
    });
  };

  formSubmitHandler = (name, number) => {
    if (!this.repeatName(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={styles.titleContacts}>Contacts</h2>
        <Filter filter={filter} onInputChange={this.handleNameChange} />
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
