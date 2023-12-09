import React, { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = (props) => {
    const topUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const apiKey = '0faf15cab9188a8b67efc636398b904b';
    const [movies, setMovies] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);

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
    
const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);

}
        
    useEffect(() => {
        getTopRatedMovies();
    }, []);

 
return (
   <div>
  <div className="topbarinfo">TOP 5 MOVIES</div>
  <div className="movie-card-container1">
        {movies.slice(0 , 5).map((movie, index) => (
          <div key={index} className="card-container1">
            <div className="card-img-container1">
              {movie.poster_path && (
                <img className="card-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster"/>
            )}
            </div>
        </div>
        ))}
        <div className="randomBox">
            <div className="randomMovie">Don't know what to watch?
            </div>
                <button className="randomButtonMovie" onClick={handleRandomMovie}>
                    <h1>Click here and get random movie to watch</h1>
                </button>
        </div>
    </div>
</div>
)};

export default HomePage;