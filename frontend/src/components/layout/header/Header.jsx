import React from "react";
import './Header.css';
import { Nav } from "./navbar/Navbar";
import { BsPerson } from "react-icons/bs";

export const Header = () => {
    const logo = 'logo.png';
    return (
        <>
            <div className="row">
                <header className="navbar navbar-black bg-black">
                    <div className="col-4 col-xs-4 col-sm-4">
                        <div className="logo-img d-flex py-1">
                            <img src={logo} alt="Logotipo" className="ms-4" />
                            <h4 className="ms-3 mt-2">Sneaker Place</h4>
                        </div>
                    </div>
                    <div className="col-5 col-xs-5 col-sm-5">
                        <div className="select-language-currence mx-5 d-flex justify-content-center">
                            <select name="language" id="language" className="text-center mx-2">
                                <option value="Portuguese">Portuguese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                            </select>
                            <select name="currence" id="currence" className="mx-2">
                                <option value="Portuguese">EUR (€)</option>
                                <option value="English">USD ($)</option>
                                <option value="French">KZ</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-3 col-xs-3 col-sm-3">
                        <div className="text-end mx-5">
                            <BsPerson className="icon-profile" size={'2em'} />
                            <span className="sell ms-3 px-4 py-2">Sell</span>
                        </div>
                    </div>
                </header>
            </div>
            <Nav />
        </>
    )
}
