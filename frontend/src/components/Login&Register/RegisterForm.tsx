import { MouseEventHandler, useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { UserApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface RegisterFormProps {
    handleClose: MouseEventHandler;
}

interface mutationData {
    username: string,
    password: string,
    email: string,
}

type FormValues = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    agree: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
    const { login } = useLogin({ redirect: '/' });
    const form = useForm<FormValues>();
    const { register, handleSubmit, formState, getValues } = form;
    const { errors } = formState;

    const [errorMessage, setErrorMessage] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation((data: mutationData) => UserApi.register(data.username, data.password, data.email), {
        onError: (error) => {
            console.error('Failed to register user:', error);
            setErrorMessage("Uživatelské údaje už existují nebo jsou nesprávné");
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['users']);
            login({ password: variables.password, username: variables.username });
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate({ email: data.email, password: data.password, username: data.username });
    }

    return (
        <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="nickname"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Přezdívka"
                        required
                        {...register("username")} />
                </label>
                <label id="error" className='text-black'>{errors.username?.message}</label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Heslo"
                        {...register("password", {
                            required: "Musíte vyplnit heslo",
                            minLength: {
                                value: 8,
                                message: "Heslo musí mít minimálně 8 znaků"
                            }
                        })} />
                </label>
                <label id="error" className='text-black'>{errors.password?.message}</label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="confirmPassword"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Znovu Heslo"
                        required
                        {...register("confirmPassword", {
                            validate: value => value === getValues("password") || "Hesla se neshodují",
                        })} />
                </label>
                <label id="error" className='text-black'>{errors.confirmPassword?.message}</label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Neplatný e-mail"
                            }
                        })} />
                </label>
                <label id="error" className='text-black'>{errors.email?.message}</label>
            </div>
            <div className="mb-4 flex items-center">
                <input id="agreeCheck"
                    className="mr-2"
                    type="checkbox"
                    {...register("agree", {
                        required: "Musíte souhlasit"
                    })} />
                <label id="agree"
                    className="text-sm font-bold"
                    htmlFor="terms">
                    <div className='text-black'>Souhlasím</div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Registrovat se
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleClose}>X
                </button>
            </div>
            <div className="mb-4 flex items-center">
                <label id="error" className='text-black'><br />{errors.agree?.message}</label>
                <label id="error" className='text-black'>{errorMessage}</label>
            </div>
        </form>
    );
};
