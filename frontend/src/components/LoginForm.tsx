import {  MouseEventHandler } from 'react';


interface LoginFormProps {
    handleClose: MouseEventHandler;
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
    //   const handleSubmit = () => {
    //      tady prijde backend sracky
    //   };

    return (
        <form className="p-6 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Přezdívka
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nickname" placeholder="nickname" required />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-bold mb-2">
                    Heslo
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="password" required />
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Přihlásit se</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>X</button>
            </div>
        </form>
    );
};