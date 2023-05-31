export const Header = () => {
  return (
    <div className="flex flex-col h-24 w-screen fixed top-0">
            <header className="flex flex-row w-full border-black border-b-4 max-h-full rounded-md justify-between items-center pt-2 pb-2">
                <img src="./../../logo-placeholder.png" className="max-h-full h-auto border-r-2 border-black" />
                <div className="flex flex-row h-1/2 w-1/4 items-center">
                    <input type="text" placeholder="Hledat" className="border-2 border-black border-r-0 h-full w-full self-center p-1 rounded-md rounded-tr-none rounded-br-none outline-none" />
                    <a className="h-full w-auto p-1 border-black border-2 border-l-0 rounded-md rounded-tl-none rounded-bl-none cursor-pointer">
                        <img src="./../../mag_glass.png" className="max-h-full" />
                    </a>
                </div>
                <div className="flex flex-row justify-between w-1/3 h-1/2 items-center">
                    <a className="inline-flex border-black border-2 rounded-md p-1 w-20 items-center justify-center cursor-pointer">
                        Hry
                    </a>
                    <a className="inline-flex border-black border-2 rounded-md p-1 w-20 items-center justify-center cursor-pointer">
                        Žánry
                    </a>
                    <a className="inline-flex border-black border-2 rounded-md p-1 w-20 items-center justify-center cursor-pointer">
                        Studia
                    </a>
                </div>

                {/* Visible to anonymous user */}
                <div className="flex flex-col h-full w-32 justify-between items-center pl-2 pr-2 border-l-2 border-black">
                    <a className="inline-flex w-full h-full items-center justify-center border-b-2 border-black cursor-pointer">
                        Přihlásit
                    </a>
                    <a className="inline-flex w-full h-full items-center justify-center cursor-pointer">
                        Registrovat
                    </a>
                </div>

                {/* Visible to logged in user */}
                <div className="flex flex-col h-full w-32 justify-between items-center pl-2 pr-2 border-l-2 border-black hidden">
                    <a className="inline-flex w-full h-full items-center justify-center border-b-2 border-black cursor-pointer">
                        Wishlist
                    </a>
                    <a className="inline-flex w-full h-full items-center justify-center cursor-pointer">
                        Odhlásit
                    </a>
                </div>
            </header>
        </div>
  )
}
