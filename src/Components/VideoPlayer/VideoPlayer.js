import React from 'react';
import { motion } from 'framer-motion';
import './VideoPlayer.css';

const VideoPlayer = ({ url, onClose }) => {
  return (
    <motion.div 
      className="video-player-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="video-player-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button className="close-button" onClick={onClose}>×</button>
        <video src={url} controls autoPlay className="video-player" />
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;