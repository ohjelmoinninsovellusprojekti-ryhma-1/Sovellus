
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationButton = ({ to, label, icon }) => (
  <Link to={to} className="NavigationButton">
    <FontAwesomeIcon icon={icon} />
    {label}
  </Link>
);

export default NavigationButton;


