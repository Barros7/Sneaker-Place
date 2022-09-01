import React from "react";
import './Navbar.css';

export const Nav = () => {
    return (
        <nav className="row bg-light py-2">
            <div className="col-4 col-xs-4 col-sm-4 mt-3">
                <ul className="hiperlinks-mark text-center">
                    <li className="link">Shop</li>
                    <li className="link">Adidas</li>
                    <li className="link">Air Jordan</li>
                    <li className="link">Nike</li>
                </ul>
            </div>
            <div className="col-5 col-xs-5 col-sm-5 col-md-5 text-center align-self-center">
                <input type="search" name="search" id="search" className="search px-3" placeholder="Typing ..." />
            </div>
            <div className="col-3 col-xs-3 col-sm-3 mt-3">
                <ul className="hiperlinks-mark text-center">
                    <li className="link">Order Status</li>
                    <li className="link">Help</li>
                </ul>
            </div>
        </nav>
    )
}