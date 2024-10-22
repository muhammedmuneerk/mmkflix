import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import './MovieDetail.css';
import { motion, AnimatePresence } from 'framer-motion';

function MovieDetail({ selectedMovie, setSelectedMovie, myList, setMyList, onPlay }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isInMyList, setIsInMyList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieResponse, creditsResponse, similarResponse, videosResponse] = await Promise.all([
          axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`/movie/${id}/credits?api_key=${API_KEY}`),
          axios.get(`/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`),
          axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        ]);

        setMovie(movieResponse.data);
        setSelectedMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 10));
        setSimilarMovies(similarResponse.data.results.slice(0, 6));
        
        const trailer = videosResponse.data.results.find(video => video.type === "Trailer");
        if (trailer) {
          setMovie(prevMovie => ({ ...prevMovie, trailerKey: trailer.key }));
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id, setSelectedMovie]);

  useEffect(() => {
    setIsInMyList(myList.some(item => item.id === parseInt(id)));
  }, [myList, id]);

  const toggleMyList = () => {
    if (isInMyList) {
      setMyList(myList.filter(item => item.id !== movie.id));
    } else {
      setMyList([...myList, movie]);
    }
    setIsInMyList(!isInMyList);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <motion.div 
      className="movie-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop" style={{backgroundImage: `url(${imageUrl + movie.backdrop_path})`}}>
        <div className="backdrop-overlay">
          <div className="movie-info">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {movie.title}
            </motion.h1>
            <motion.div 
              className="movie-meta"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>{movie.release_date.split('-')[0]}</span>
              <span>{movie.vote_average.toFixed(1)} ⭐ ({movie.vote_count} votes)</span>
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              <span>{movie.spoken_languages.map(lang => lang.english_name).join(', ')}</span>
            </motion.div>
            {movie.tagline && (
              <motion.p 
                className="tagline"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                "{movie.tagline}"
              </motion.p>
            )}
            <motion.div 
              className="action-buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="play-button" onClick={() => onPlay(movie.id)}>
                <i className="fas fa-play"></i> Play
              </button>
              {movie.trailerKey && (
                <button className="trailer-button" onClick={() => setShowTrailer(true)}>
                  <i className="fas fa-film"></i> Trailer
                </button>
              )}
              <button className="my-list-button" onClick={toggleMyList}>
                {isInMyList ? (
                  <><i className="fas fa-check"></i> My List</>
                ) : (
                  <><i className="fas fa-plus"></i> My List</>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="movie-content">
        <div className="tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'cast' ? 'active' : ''} 
            onClick={() => setActiveTab('cast')}
          >
            Cast
          </button>
          <button 
            className={activeTab === 'details' ? 'active' : ''} 
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={activeTab === 'similar' ? 'active' : ''} 
            onClick={() => setActiveTab('similar')}
          >
            Similar
          </button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="overview">{movie.overview}</p>
              <div className="genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'cast' && (
            <motion.div
              key="cast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="cast-grid"
            >
              {cast.map(actor => (
                <div key={actor.id} className="cast-member">
                  <img src={`${imageUrl + actor.profile_path}`} alt={actor.name} onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-actor.png' }} />
                  <h3>{actor.name}</h3>
                  <p>{actor.character}</p>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="movie-details"
            >
              <div className="detail-item">
                <h3>Status</h3>
                <p>{movie.status}</p>
              </div>
              <div className="detail-item">
                <h3>Budget</h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div className="detail-item">
                <h3>Revenue</h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className="detail-item">
                <h3>Production Companies</h3>
                <div className="production-companies">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="company">
                      {company.logo_path ? (
                        <img src={`${imageUrl + company.logo_path}`} alt={company.name} />
                      ) : (
                        <span>{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {movie.homepage && (
                <div className="detail-item">
                  <h3>Homepage</h3>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
                </div>
              )}
            </motion.div>
          )}
          {activeTab === 'similar' && (
            <motion.div
              key="similar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="similar-grid"
            >
              {similarMovies.map(movie => (
                <div key={movie.id} className="similar-movie">
                  <img src={`${imageUrl + movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date.split('-')[0]}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content" onClick={e => e.stopPropagation()}>
            <button className="close-trailer" onClick={() => setShowTrailer(false)}>
              <i className="fas fa-times"></i>
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie.trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MovieDetail;