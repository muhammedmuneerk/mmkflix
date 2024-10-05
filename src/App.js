import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import { action, originals, trending, comedy, romance, horror, documentaries } from "./urls";
import './App.css';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/> 
      <RowPost url={originals} title='Netflix Original'  />
      <RowPost url={trending} title='Trending' isMid  />
      <RowPost url={action} title='Action' isSmall  />
      <RowPost url={comedy} title='Comedy' isSmall  />
      <RowPost url={romance} title='Romance' isSmall  />
      <RowPost url={horror} title='Horror' isSmall  />
      <RowPost url={documentaries} title='Documentaries' isExtSml  />
      <Footer/>
    </div>
  );
}

export default App;
