import { useState } from 'react'
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { FormForContact, AddButton, Span, Input } from './ContactForm.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputName = event => {
    setName(event.currentTarget.value);
  };
  const onInputNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(5),
      name: name,
      number: number,
    };

    if (contacts.find((i) => i.name === name)) {
      toast.success(`${name} is already in contacts`);
        setName('');
        setNumber('');
        return;
    }

    addContact(contact);
    setName('');
    setNumber('');
  };

    return (
      <FormForContact onSubmit={onSubmitForm} action="">
        <label>
          <Span>Name</Span>
          <Input
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputName}
          />
        </label>
        <label>
          <Span>Number</Span>
          <Input
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInputNumber}
          />
        </label>
        <AddButton type="submit">Add contact</AddButton>
      </FormForContact>
    );
  }

  ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

