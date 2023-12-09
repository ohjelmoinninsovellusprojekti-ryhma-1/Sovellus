
import React from 'react';
import MovieNavigationButton from './MovieNavigationButton';
import TVSeriesNavigationButton from './TVSeriesNavigationButton';
import { faStar, faFilm, faTv, faPlay } from '@fortawesome/free-solid-svg-icons';

const NavigationButtons = ({ isMovies }) => {
  const commonButtons = [
    { icon: faStar, to: isMovies ? '/top-rated-movies' : '/top-rated-tv', label: '' },
    { icon: faFilm, to: isMovies ? '/popular-movies' : '/popular-tv', label: '' },
    { icon: faTv, to: isMovies ? '/upcoming-movies' : '/trending-tv', label: '' },
    { icon: faPlay, to: isMovies ? '/news' : '/news', label: '' },
  ];

  return (
    <div className="NavigationButtons">
      {commonButtons.map((button, index) =>
        isMovies ? (
          <MovieNavigationButton key={index} to={button.to} label={button.label} icon={button.icon} />
        ) : (
          <TVSeriesNavigationButton key={index} to={button.to} label={button.label} icon={button.icon} />
        )
      )}
    </div>
  );
};

export default NavigationButtons;


