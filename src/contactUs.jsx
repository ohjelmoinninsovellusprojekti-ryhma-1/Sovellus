// tämä sivu lähettää viestin meidän tietokantaan kun painaa submit
import React, { useState } from 'react';
import './contactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setNotification('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setNotification('Form submitted successfully');
      
        setFormData({ name: '', email: '', message: '' });
      } else {
        setNotification('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-form-container">
        {notification && <p className="notification">{notification}</p>}
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="contact-info-container">
        <h2>Contact Information</h2>
        <p>Location: Oulu</p>
        <p>Email: esimerkki@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
  );
};

export default ContactUs;

