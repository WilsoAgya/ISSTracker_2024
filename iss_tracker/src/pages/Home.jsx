/* eslint-disable no-unused-vars */
import react from "react";
import InfoComponent from "../components/InfoComponent";

import Navbar from '../components/Nav';
import Main from '../components/Main';
import '../App.css'; 

const Home = () => {
  return (
    <>
      <div id='background'>
      <div className="main"></div>
            <Navbar />
            <Main />
        </div>
    </>
  );
};

export default Home;
