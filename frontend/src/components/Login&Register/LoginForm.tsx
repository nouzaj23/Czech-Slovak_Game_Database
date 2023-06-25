import { MouseEventHandler } from 'react';
import useLogin from '../../hooks/useLogin';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
    handleClose: MouseEventHandler;
}

type FormValues = {
    username: string,
    password: string,
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
    const { login } = useLogin({ redirect: '/' })

    const form = useForm<FormValues>()
    const { register, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        login({username: data.username, password: data.password});
    }

    return (
        <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="nickname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Přezdívka" required {...register("username")} />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-bold mb-2">
                    <input id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Heslo" required {...register("password")} />
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Přihlásit se</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>X</button>
            </div>
        </form>
    );
};