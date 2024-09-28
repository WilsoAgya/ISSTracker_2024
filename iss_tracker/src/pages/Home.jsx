import react from 'react';
import Navbar from '../components/Nav';
import Main from '../components/Main';
import '../App.css'; 

const Home = () => {

    return(
        <div>
            <div id='background'></div>
            <div id='content'>
                <Navbar/>
                <Main/>
            </div>
        </div>
    )
}

export default Home;