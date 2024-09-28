import react from 'react';
import '../App.css'; 

const Navbar = () => {

    return(
        <nav id="navbar" class="bg-dark navbar">
            <div className="py-1 px-3 container-fluid d-flex align-items-center h-100">
                <h1 id="nav_title">ISS Tracker</h1>
            </div>
        </nav>
    )
}

export default Navbar;