
import React, { useState, useEffect } from "react";
import axios from "axios";
import './milla.css';


export const HomePage = (props) => {
    const topUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const apiKey = '0faf15cab9188a8b67efc636398b904b';
    const [movies, setMovies] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);
    

function myFunction () {
    var lightmodeElement = document.body;
    lightmodeElement.classList.toggle('lightmode');
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('lightmode');

    button.addEventListener('click', function () {
        changeBackgroundColor();
    });

    function changeBackgroundColor() {
        var body = document.body;
        var thisColor = window.getComputedStyle(body, null).getPropertyValue('background-color');

        if (thisColor === 'rgb(0,0,0)' || thisColor === '#000' || this.Color.toLowerCase () === 'black') {
            body.style.backgroundColor = 'white';
        } else {
            console.log('ei toimi');
        }
    }
});

    const getTopRatedMovies = async () => {
        try {
            const response = await axios.get(topUrl, {
            params: {
                api_key: apiKey,
            },
        });
            setMovies(response.data.results);
        } catch (err) {
            console.error(err);
        }
    };

function handleRandomMovie() {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);
    closePop();
};

const closePop = () => {
    var popup = document.getElementById('popup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
  };
        
    useEffect(() => {
        getTopRatedMovies();
    }, []);

 
return (
    <div>
    <div className="lightmode">
      <button className="buttonlight" onClick={myFunction}>
        Lightmode
      </button>
    </div>
    <div className="topbarinfo">TOP 5 MOVIES</div>
    <div className="movie-card-container1">
      {movies.slice(0, 5).map((movie, index) => (
        <div key={index} className="card-container1">
          <div className="card-img-container1">
            {movie.poster_path && (
              <img
                className="card-img1"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie-poster"
              />
            )}
        </div>
        </div>
    ))}
      <div id="popup" className="popup">
        <div className="popUp-content">
          <span className="close" id="popUpClose" onClick={closePop}>&times;</span>
          {randomMovie && (
            <div>
            <h2>{randomMovie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`}
                alt="movie-poster"
              />
            </div>
        )}
        </div>
       </div>
       <div className="randomBox">
        <div className="randomMovie">Don't know what to watch?</div>
        <button className="randomButtonMovie" onClick={handleRandomMovie}>
        <h1 className="randomMovieHeading">Click for random movie</h1>
        </button>
      </div>
    </div>
  </div>
);
};

export default HomePage;

