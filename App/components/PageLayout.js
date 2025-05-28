import Footer from "./Footer";
import Navabr from "./Navbar";
import MobileSideMenu from "./MobileSideMenu";
import { createContext } from "react";
import ShoppingCard from "./ShoppingCart";
import { getCookie } from 'helpers/Helpers';

export default function PageLayout({ children, className }) {


    return (

        <>
            <MobileSideMenu />
            <Navabr />
            {/* <ShoppingCard /> */}
            <div className={`page-wrapper direction-r ${className}`} >
                {children}
            </div>
            <Footer />
        </>

    );
}