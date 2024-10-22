import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import NavBar from './Components/NavBar/NavBar';
import { action, originals, trending, comedy, romance, horror, documentaries } from "./urls";
import './App.css';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import Footer from './Components/Footer/Footer';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Search from './Components/Search/Search';
import MyList from './Components/MyList/MyList';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import UserProfile from './Components/UserProfile/UserProfile';
import Recommendations from './Components/Recommendations/Recommendations';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myList, setMyList] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const handlePlayVideo = (url) => {
    setVideoUrl(url);
    setIsPlaying(true);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <NavBar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Banner myList={myList} setMyList={setMyList} setSelectedMovie={setSelectedMovie} onPlay={handlePlayVideo} />
                    <RowPost url={originals} title='MMKFlix Originals' setSelectedMovie={setSelectedMovie} />
                    <RowPost url={trending} title='Trending Now' isMid setSelectedMovie={setSelectedMovie} />
                    <RowPost url={action} title='Action Thrillers' isSmall setSelectedMovie={setSelectedMovie} />
                    <RowPost url={comedy} title='Comedy Movies' isSmall setSelectedMovie={setSelectedMovie} />
                    <RowPost url={romance} title='Romantic Movies' isSmall setSelectedMovie={setSelectedMovie} />
                    <RowPost url={horror} title='Horror Movies' isSmall setSelectedMovie={setSelectedMovie} />
                    <RowPost url={documentaries} title='Documentaries' isExtSml setSelectedMovie={setSelectedMovie} />
                    <Recommendations user={user} setSelectedMovie={setSelectedMovie} />
                  </motion.div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
              <Route path="/search" element={<Search setSelectedMovie={setSelectedMovie} />} />
              <Route path="/mylist" element={<MyList myList={myList} setMyList={setMyList} setSelectedMovie={setSelectedMovie} />} />
              <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
              <Route path="/movie/:id" element={<MovieDetail selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} myList={myList} setMyList={setMyList} onPlay={handlePlayVideo} />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          {isPlaying && <VideoPlayer url={videoUrl} onClose={() => setIsPlaying(false)} />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;