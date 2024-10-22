// import React, { useEffect, useState } from 'react'
// import Youtube from 'react-youtube'
// import './RowPost.css'
// import { imageUrl, API_KEY } from "../../constants/constants";
// import axios from '../../axios';
// import { useNavigate } from 'react-router-dom';

// function RowPost({ url, title, isSmall, isMid, isExtSml, setSelectedMovie }) {
//   const [movies, setMovies] = useState([])
//   const [trailerUrl, setTrailerUrl] = useState("")
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(url).then(response => {
//       setMovies(response.data.results)
//     }).catch(err => {
//       console.error('Network Error', err)
//     })
//   }, [url])

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const handleMovie = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl('')
//     } else {
//       axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
//         .then(response => {
//           if (response.data.results.length !== 0) {
//             setTrailerUrl(response.data.results[0].key)
//           } else {
//             console.log("No trailer available")
//           }
//         })
//     }
//   }

//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//     navigate(`/movie/${movie.id}`);
//   }

//   return (
//     <div className='row'>
//       <h2>{title}</h2>
//       <div className="posters">
//         {movies.map((movie) =>
//           <img
//             key={movie.id}
//             onClick={() => handleMovieClick(movie)}
//             className={`poster ${isSmall ? 'smallPoster' : isMid ? 'midPoster' : isExtSml ? 'extSmlPoster' : ''}`}
//             src={`${imageUrl+movie.backdrop_path}`}
//             alt={movie.name}
//           />
//         )}
//       </div>
//       {trailerUrl && <Youtube opts={opts} videoId={trailerUrl} />}
//     </div>
//   )
// }

// export default RowPost


//----------------------------------------//




import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';
import './RowPost.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(props.url).then(response => {
            setMovies(response.data.results);
        }).catch(err => {
            console.error('Network Error', err);
        });
    }, [props.url]);

    const handleMovie = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className={`row ${props.isSmall ? 'small-row' : ''}`}>
            <h2>{props.title}</h2>
            <motion.div 
                className="posters" 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
                {movies.map((obj) => (
                    <motion.div 
                        key={obj.id}
                        className="poster-wrapper"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMovie(obj.id)}
                    >
                        <img className={props.isSmall ? 'small-poster' : 'poster'} alt={obj.title} src={`${imageUrl+obj.backdrop_path}`} />
                        <div className="poster-info">
                            <h3>{obj.title || obj.name}</h3>
                            <p>{obj.vote_average.toFixed(1)} ⭐</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default RowPost;