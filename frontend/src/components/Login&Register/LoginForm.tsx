import {  FormEventHandler, MouseEventHandler, useCallback } from 'react';
import useLogin from '../../hooks/useLogin';


interface LoginFormProps {
    handleClose: MouseEventHandler;
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
    const { login } = useLogin({ redirect: '/' })

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        login();
    }, [login]);

    return (
        <form className="p-6 bg-white rounded shadow-md"  onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nickname" placeholder="Přezdívka" required />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-bold mb-2">                
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Heslo" required />
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Přihlásit se</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>X</button>
            </div>
        </form>
    );
};