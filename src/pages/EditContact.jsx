import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../utils/db';

function EditContact() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const docRef = doc(db, 'contacts', id);
                const contactSnapshot = await getDoc(docRef);
                if (contactSnapshot.exists()) {
                    const contact = contactSnapshot.data();
                    setFirstName(contact.firstName);
                    setLastName(contact.lastName);
                    setEmail(contact.email);
                } else {
                    console.error('No such contact!');
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        fetchContact();
    }, [id]);

    const handleUpdateContact = async (event) => {
        event.preventDefault();
        try {
            const docRef = doc(db, 'contacts', id);
            await updateDoc(docRef, {
                firstName,
                lastName,
                email,
            });
            navigate(`/ContactDetails/${id}`);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleDeleteContact = async () => {
        try {
            const docRef = doc(db, 'contacts', id);
            await deleteDoc(docRef);
            navigate('/');
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div className="edit-contact-container">
            <button onClick={() => navigate('/')} className="back-button">{"< Contacts"}</button>
            <h2>Edit Contact</h2>
            <form onSubmit={handleUpdateContact} className="contact-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="update-button">Update Contact</button>
                <button type="button" onClick={handleDeleteContact} className="delete-button">Delete Contact</button>
            </form>
        </div>
    );
}

export default EditContact;
