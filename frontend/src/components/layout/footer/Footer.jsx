import React from "react";
import './Footer.css';
import { SiFacebook } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';
import { TbBrandYoutube } from 'react-icons/tb';
import { MdDone } from 'react-icons/md';

export const Footer = () => {
    return (
        <>
            <footer className="bg-light">
                <div className="row footer px-5">
                    <div className="col-sm-3">
                        <h5 className="text-start mt-3 mb-4">FAQ</h5>
                        <p className="link-footer">Why are my pay-outs delayed?</p>
                        <p className="link-footer">Are all sneakers new?</p>
                        <p className="link-footer">How to buy a product?</p>
                    </div>
                    <div className="col-sm-3">
                        <h5 className="text-start mt-3 mb-4">Support</h5>
                        <p className="link-footer">Ask your question</p>
                        <p className="link-footer">Contact</p>
                        <p className="link-footer">About</p>
                    </div>
                    <div className="col-sm-3">
                        <h5 className="text-start mt-3 mb-4">Our guarantees</h5>
                        <p><MdDone/><span className="link-footer"> Guaranteed 100% authentic</span></p>
                        <p><MdDone/><span className="link-footer">New E Unworn</span></p>
                    </div>
                    <div className="col-sm-3">
                        <h5 className="text-start mt-3 mb-4">Find us on social</h5>
                            <p className="link-footer mb-2">Join 500k sneakerheads</p>
                            <div className="text-start">
                                <span className="link-footer mx-2"><SiInstagram size={'2em'}/></span>
                                <span className="link-footer mx-2"><SiFacebook size={'2em'}/></span>
                                <span className="link-footer mx-2"><TbBrandYoutube size={'2.5em'}/></span>
                            </div>
                    </div>
                </div>
            </footer>
        </>
    )
}