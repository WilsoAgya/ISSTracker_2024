/* eslint-disable no-unused-vars */

import Navbar from '../components/Nav';
import Main from '../components/Main';
import Map from '../components/Map';
import '../App.css'; 

const Home = () => {
  return (
    <>
        <div id='background'>
            <Navbar />
            <Main />
        </div>
        <Map />
    </>
  );
};

export default Home;
