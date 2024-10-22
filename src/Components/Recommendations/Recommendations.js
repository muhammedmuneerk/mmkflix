import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import './Recommendations.css';

function Recommendations({ user, setSelectedMovie }) {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you'd use the user's viewing history to get personalized recommendations
    // For this example, we'll just get popular movies
    axios.get(`movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        setRecommendations(response.data.results.slice(0, 10));
      })
      .catch(error => console.error('Error fetching recommendations:', error));
  }, [user]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="recommendations">
      <h2>Recommended for You</h2>
      <div className="recommendations-grid">
        {recommendations.map(movie => (
          <div key={movie.id} className="recommendation-item" onClick={() => handleMovieClick(movie)}>
            <img src={`${imageUrl + movie.poster_path}`} alt={movie.title} />
            <div className="recommendation-info">
              <h3>{movie.title}</h3>
              <p>{movie.vote_average}/10</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;