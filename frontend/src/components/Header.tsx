import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="flex flex-row w-full h-16 fixed top-0 bg-gray-800 text-white justify-between items-center px-4 shadow-md">
            <Link to="/">
                <img src="./../../logo-placeholder.png" className="h-10 w-auto mr-2" />
            </Link>
            <div className="flex flex-row items-center border-2 border-gray-600 rounded-full w-1/3">
                <input type="text" placeholder="Hledat" className="rounded-l-full h-full w-full pl-2 bg-gray-800 outline-none text-white" />
                <button className="p-2 rounded-r-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                    <img src="./../../mag_glass.png" className="h-6 w-6" />
                </button>
            </div>
            <div className="flex flex-row justify-between w-1/3 items-center">
                <Link to="/games">
                    <button className="px-3 py-1 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                        Hry
                    </button>
                </Link>
                <button className="px-3 py-1 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                    Žánry
                </button>
                <button className="px-3 py-1 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
                    Studia
                </button>
            </div>

            {/* Visible to anonymous user */}
            <div className="flex flex-col h-full justify-between items-center pl-2 pr-2 border-l-2 border-gray-700">
                <button className="w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                    Přihlásit
                </button>
                <button className="w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                    Registrovat
                </button>
            </div>

            {/* Visible to logged in user */}
            <div className="flex flex-col h-full justify-between items-center pl-2 pr-2 border-l-2 border-gray-700 hidden">
                <button className="w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                    Wishlist
                </button>
                <button className="w-full h-full flex items-center justify-center hover:text-gray-300 transition-colors duration-300 ease-in-out">
                    Odhlásit
                </button>
            </div>
        </div>
    )
}
