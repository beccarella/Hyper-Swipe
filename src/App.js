import React from 'react';
import './App.css';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <div>
        <button>DISLIKE</button>
        <button>LIKE</button>
      </div>
    </div>
  );
}

export default App;