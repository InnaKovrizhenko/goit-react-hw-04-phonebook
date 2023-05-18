import { useState, useEffect } from 'react'
import { ContactForm } from './ContactForm/ContactForm'
import { Filter } from './Filter/Filter'
import { ContactList } from './ContactList/ContactList'
import { Titleh1, Titleh2, Phonebook } from './App.styled'
import { ToastContainer } from 'react-toastify';


export const App = () => {
    const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
    const [filter, setFilter] = useState ('');

    useEffect (() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts])
  
  const addContact = (contact) => {
    setContacts([...contacts, contact])
    }

  const changeFilter = (el) => {
    setFilter(el.target.value)
  }

  const handleFilterContact = () => {
    return contacts.filter(contact => contact.name.toLowerCase()
    .includes(filter.toLowerCase().trim()));
  }

  const deleteContact = (contactId) => {
    setContacts(() => {
      return (
        contacts.filter((contact) => contact.id !== contactId)
      )})
  }

return (
  <Phonebook>
  <Titleh1>Phonebook</Titleh1>
  <ContactForm addContact={addContact} contacts={contacts} />
  <Titleh2>Contacts</Titleh2>
  <Filter value={filter} onChange={changeFilter}/>
  <ContactList visibleListContacts={handleFilterContact()} deleteContact={deleteContact} />
  <ToastContainer autoClose={2000} />
</Phonebook>)
}

