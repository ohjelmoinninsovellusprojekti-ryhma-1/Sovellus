import React from 'react';
import './contactUs.css'; 

const ContactUs = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
    
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

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


