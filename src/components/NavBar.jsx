import { NavLink } from "react-router";

function NavBar() {
    return (
        <nav>
            <h1>HETIC</h1>
             <div>
                <NavLink
                    to="/home"
                >
                    Home
                </NavLink>
                <br/>
                <NavLink
                    to="/about"
                >
                    About
                </NavLink>
             </div>
        </nav>
    );
}

export default NavBar;