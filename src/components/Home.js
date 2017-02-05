import React from 'react';
import ZipFormComponent from './ZipFormComponent';
import '../App.css';

function Home() {
  return (
    <div className="Home text-center">
      <h1>Enter Your Zip</h1>
      <ZipFormComponent />
    </div>
  );
}

export default Home;
