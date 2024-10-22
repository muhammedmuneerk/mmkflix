import React from 'react';
import { imageUrl } from '../../constants/constants';
import './MyList.css';

const MyList = ({ myList, setMyList }) => {
  const removeFromList = (movieId) => {
    setMyList(myList.filter(movie => movie.id !== movieId));
  };

  return (
    <div className="mylist-container">
      <h2>My List</h2>
      <div className="mylist-grid">
        {myList.map((movie) => (
          <div key={movie.id} className="mylist-item">
            <img
              src={`${imageUrl}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="mylist-item-info">
              <h3>{movie.title}</h3>
              <button onClick={() => removeFromList(movie.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;