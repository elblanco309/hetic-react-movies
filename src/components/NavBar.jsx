import { NavLink } from "react-router";

function NavBar() {
    return (
        <nav>
            <h1>EEEEEEE</h1>
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
                <br/>
                <NavLink
                    to="/contact"
                >
                    Contact
                </NavLink>
             </div>
        </nav>
    );
}

export default NavBar;