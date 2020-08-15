import React from 'react';
import './App.css';
import Header from './components/Header';
import SwiperCard from './components/SwiperCard';


function App() {
  return (
    <div id="mainContainer">
      <Header />
      <div id="mainContent">
        <button className="btn">DISLIKE</button>
          <SwiperCard />
        <button className="btn">LIKE</button>
      </div>
    </div>
  );
}

export default App;