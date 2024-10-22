import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../axios';
import './Banner.css';
import { motion } from 'framer-motion';

function Banner({ myList, setMyList, setSelectedMovie, onPlay }) {
    const [movie, setMovie] = useState();
    const [isInMyList, setIsInMyList] = useState(false);

    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
            setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)]);
        });
    }, []);

    useEffect(() => {
        if (movie && myList) {
            setIsInMyList(myList.some(item => item.id === movie.id));
        }
    }, [movie, myList]);

    const addToMyList = () => {
        if (!isInMyList) {
            setMyList([...myList, movie]);
            setIsInMyList(true);
        }
    };

    const removeFromMyList = () => {
        if (isInMyList) {
            setMyList(myList.filter(item => item.id !== movie.id));
            setIsInMyList(false);
        }
    };

    return (
        <motion.div 
            style={{backgroundImage: `url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
            className='banner'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className='content'>
                <h1 className='title'>{movie ? movie.title || movie.name : ''}</h1>
                <div className='banner_buttons'>
                    <button className='button' onClick={() => onPlay(movie.id)}>Play</button>
                    {isInMyList ? (
                        <button className='button' onClick={removeFromMyList}>Remove from My List</button>
                    ) : (
                        <button className='button' onClick={addToMyList}>Add to My List</button>
                    )}
                </div>
                <h1 className='description'>{movie ? movie.overview : ''}</h1>
            </div>
            <div className="fade_bottom"></div>
        </motion.div>
    );
}

export default Banner;