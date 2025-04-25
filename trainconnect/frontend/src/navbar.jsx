import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authcontext";
import './App.css';

function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(user.name || "User"); // fallback if name is missing
        }
    }, [isLoggedIn]);

    return (
        <nav>
            <table>
                <tbody>
                    <tr>
                        <td><Link to="/"><img src="/img/logo.png" alt="Logo" className="navbar-logo" /></Link></td>
                        <td><Link to="/"><h2 className="navhead">Home</h2></Link></td>
                        <td><Link to="/bookings"><h2 className="navhead">Bookings</h2></Link></td>
                        <td><Link to="/tickets"><h2 className="navhead">Tickets</h2></Link></td>
                        <td><Link to="/help"><h2 className="navhead">Help</h2></Link></td>
                        <td style={{ textAlign: "center" }}> {isLoggedIn ? (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Link to="/dashboard"> <img src="/img/profile.png" alt="Profile" className="profile-pic" /> </Link>
                                    <span className="user-greeting">
                                         Hi, {userName}
                                    </span>
                                </div>
                            ) : (
                                <button className="loginbutton" onClick={() => window.location.href='/login'} type="button"> Login </button> )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </nav>
    );
}

export default Navbar;
