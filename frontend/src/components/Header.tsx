import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col sm:flex-row w-full h-auto sm:h-16 fixed top-0 bg-gray-800 text-white justify-between items-center px-4 shadow-md">
            <div className="flex flex-row justify-between w-full sm:w-auto">
                <Link to="/">
                    <img src="./../../logo-placeholder.png" className="h-10 w-auto mr-2 mt-3 sm:mt-0 mb-3 sm:mb-0" />
                </Link>

                <div className="sm:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6 mt-5 mb-4" />
                    </button>
                </div>
            </div>

            <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row w-full sm:w-1/3 items-center border-2 border-gray-600 rounded-full mt-2 sm:mt-0`}>
                <div className="flex w-full items-center">
                    <input type="text" placeholder="Hledat" className="flex-grow rounded-l-full h-full pl-2 bg-gray-800 outline-none text-white" />
                    <div className="rounded-r-full overflow-hidden">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                            <img src="./../../mag_glass.png" className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>



            <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row justify-center items-center w-full sm:w-1/3 mt-2 sm:mt-0 bg-transparent`}>
                <Link to="/games" className="w-full text-center">
                    <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Hry
                    </button>
                </Link>
                <Link to="/games" className="w-full text-center">
                    <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Žánry
                    </button>
                </Link>
                <Link to="/games" className="w-full text-center">
                    <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Studia
                    </button>
                </Link>
            </div>

            <div className="">
                <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 ${isOpen ? '' : 'sm:border-l-0'} mb-2 sm:mb-0`}>
                    <Link to="/games">
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                            Přihlásit
                        </button>
                    </Link>
                    <Link to="/games">
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                            Registrovat
                        </button>
                    </Link>
                </div>
            </div>

            <div className="hidden">
                <div className={`${isOpen ? 'hidden' : 'hidden'} sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 ${isOpen ? '' : 'sm:border-l-0'}  mb-2 sm:mb-0`}>
                    <Link to="/games">
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                            Wishlist
                        </button>
                    </Link>
                    <Link to="/games">
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                            Odhlásit
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
