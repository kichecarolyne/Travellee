import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';



const Navbar = () => {
    const token = localStorage.getItem('token')

    const RenderNavbar = () => {
        if (token) {

            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">HOME <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/favorites">FAVORITES</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">LOGOUT</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">HOME <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                    </li>

                </>
            )
        }

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    {/* <img className='logo' src={logo} alt='logo' /> */}
                    <b>Travellee</b>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <RenderNavbar />
                    </ul>

                </div>
            </nav>
        </>
    )

}

export default Navbar