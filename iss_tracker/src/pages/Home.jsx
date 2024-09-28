import React from "react";
import QueryComp from "../components/QueryComp";
import Navbar from '../components/Nav';
import Main from '../components/Main';
import '../App.css'; 

const Home = () => {
  return (
    <>
      <div id='background'>
      <div class="main"></div>
        <Navbar />
        <Main />
      </div>
      <QueryComp />
    </>
  );
};

export default Home;
