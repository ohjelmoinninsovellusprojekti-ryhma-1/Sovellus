
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationButton = ({ icon, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className="NavigationButton" onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default NavigationButton;
