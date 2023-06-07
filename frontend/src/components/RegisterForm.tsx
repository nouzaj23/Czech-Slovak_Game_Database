import { MouseEventHandler } from 'react';

interface RegisterFormProps {
    handleClose: MouseEventHandler;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
    return (
        <form className="p-6 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nickname" placeholder="Přezdívka" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Heslo" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">                    
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="confirmPassword" placeholder="Znovu Heslo" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="Email" required />
                </label>
            </div>
            <div className="mb-4 flex items-center">
                <input className="mr-2" type="checkbox" name="terms" required />
                <label className="text-sm font-bold" htmlFor="terms">
                    <div className='text-black'>Souhlasím</div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Registrovat se</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>X</button>
            </div>
        </form>
    );
};
