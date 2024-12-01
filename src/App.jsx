import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import db from './utils/db';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contactsSnapshot = await getDocs(collection(db, 'contacts'));
                const contactList = contactsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setContacts(contactList);
                setFilteredContacts(contactList);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    // Function to filter contacts when the user types in the search box
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setFilteredContacts(
            contacts.filter((contact) =>
                contact.firstName.toLowerCase().includes(value) || contact.lastName.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div className="App">
            <header className="header">
                <h2>Contacts</h2>
                {/* Link to add a new contact */}
                <Link to="/AddContact" className="add-contact-button">+</Link>
            </header>
            {/* Search Box */}
            <input type="text" placeholder="Search" className="search-box" onChange={handleSearch} />
            {/* List of Contacts */}
            <ul className="contact-list">
                {filteredContacts.sort((a, b) => a.lastName.localeCompare(b.lastName)).map((contact) => (
                    <li key={contact.id} className="contact-item">
                        {/* Link to view contact details */}
                        <Link to={`/ContactDetails/${contact.id}`}>
                            {contact.firstName} {contact.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;