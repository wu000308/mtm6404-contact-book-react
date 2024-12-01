import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../utils/db';

function ContactDetails() {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            const docRef = doc(db, 'contacts', id);
            const contactSnapshot = await getDoc(docRef);
            if (contactSnapshot.exists()) {
                setContact(contactSnapshot.data());
            } else {
                console.error('No such contact!');
            }
        };

        fetchContact();
    }, [id]);

    if (!contact) {
        return <p>Loading...</p>;
    }

    return (
        <div className="contact-details-container">
            <button onClick={() => navigate('/')} className="back-button">{"< Contacts"}</button>
            <h2>{contact.firstName} {contact.lastName}</h2>
            <p><strong>Email:</strong> {contact.email}</p>
            <button onClick={() => navigate(`/edit/${id}`)} className="edit-button">Edit</button>
        </div>
    );
}

export default ContactDetails;
