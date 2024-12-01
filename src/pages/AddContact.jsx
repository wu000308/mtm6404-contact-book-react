import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import db from '../utils/db';

function AddContact() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleAddContact = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, 'contacts'), {
                firstName,
                lastName,
                email,
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div className="add-contact-container">
            <button onClick={() => navigate('/')} className="back-button">{"< Contacts"}</button>
            <h2>Add New Contact</h2>
            <form onSubmit={handleAddContact} className="contact-form">
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
                <button type="submit" className="add-button">Add Contact</button>
            </form>
        </div>
    );
}

export default AddContact;
