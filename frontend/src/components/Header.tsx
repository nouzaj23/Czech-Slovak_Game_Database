import { Link } from "react-router-dom";
import { FormEventHandler, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginForm } from "./Login&Register/LoginForm";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./Login&Register/RegisterForm";
import { CanManageCSHD, IsLogged, IsNotLogged } from '../components/Authorized';
import useLogout from "../hooks/useLogout";

export const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleSearch = () => {
        if (searchQuery != "") {
            navigate(`/search/${searchQuery}`);
            setSearchQuery("");
        }
    }

    const { logout } = useLogout({ redirect: '/' })

    const handleLogout: FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        logout();
    }, [logout])

    return (
        <div style={{ zIndex: "10" }} className="flex flex-col sm:flex-row w-full h-auto sm:h-16 fixed top-0 bg-gray-800 text-white justify-between items-center px-4 shadow-md">
            <div className="flex flex-row justify-between w-full sm:w-auto">
                <Link to="/">
                    <img src="./../../logo.png" className="h-10 w-auto mr-2 mt-3 sm:mt-0 mb-3 sm:mb-0" />
                </Link>

                <div className="sm:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6 mt-5 mb-4" />
                    </button>
                </div>
            </div>

            <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row w-full sm:w-1/3 items-center border-2 border-gray-600 rounded-full mt-2 sm:mt-0`}>
                <div className="flex w-full items-center">
                    <input type="text" placeholder="Hledat" className="flex-grow rounded-l-full h-full pl-2 bg-gray-800 outline-none text-white"
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <div className="rounded-r-full overflow-hidden">
                        <button onClick={handleSearch} className="p-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
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
                <Link to="/developers" className="w-full text-center">
                    <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Vývojáři
                    </button>
                </Link>
                <Link to="/genres" className="w-full text-center">
                    <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Žánry
                    </button>
                </Link>
                <CanManageCSHD>
                    <Link to="/adminpage" className="w-full text-center">
                        <button className="sm:w-auto w-full px-3 py-1 rounded-md text-white sm:bg-gray-700 sm:hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                            Admin
                        </button>
                    </Link>
                </CanManageCSHD>
            </div>


            <IsNotLogged>
                <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 ${isOpen ? '' : 'sm:border-l-0'} mb-2 sm:mb-0`}>
                    <div className={`sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 mb-2 sm:mb-0`}>
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out" onClick={() => setShowLogin(true)}>Přihlásit se</button>
                        {showLogin ? (
                            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <LoginForm handleClose={() => setShowLogin(false)} />
                            </div>
                        ) : null
                        }
                        <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out" onClick={() => setShowRegister(true)}>
                            Registrovat
                        </button>
                        {showRegister ? (
                            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <RegisterForm handleClose={() => setShowRegister(false)} />
                            </div>
                        ) : null
                        }
                    </div>
                </div>
            </IsNotLogged>


            <IsLogged>
                <div className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 ${isOpen ? '' : 'sm:border-l-0'} mb-2 sm:mb-0`}>
                    <div className={`sm:flex flex-col h-full justify-between w-full sm:w-auto items-center pl-2 pr-2 mb-2 sm:mb-0`}>
                        <Link to="/wishlist">
                            <button className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                                Wishlist
                            </button>
                        </Link>
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="sm:w-auto py-1 sm:py-0 w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                                Odhlásit
                            </button>
                        </form>
                    </div>
                </div>
            </IsLogged>
        </div>
    )
}
