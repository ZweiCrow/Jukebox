import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to={"/Play"}>player</Link>
    </div>
  );
};

export default Home;