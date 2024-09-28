import react from 'react';
import Navbar from '../components/Nav';
import Main from '../components/Main';
import '../App.css'; 

const Home = () => {

    return(
        <div id='background'>
            <Navbar />
            <Main />
        </div>
    )
}

export default Home;