import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      home page
      <Link to={"/Play"}>player</Link>
    </div>
  );
};

export default Home;