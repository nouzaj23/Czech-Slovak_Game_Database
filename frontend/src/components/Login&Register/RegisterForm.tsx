import { FormEventHandler, MouseEventHandler, useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { UserApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface RegisterFormProps {
    handleClose: MouseEventHandler;
}

interface mutationData {
    username: string,
    password: string,
    email: string,
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
    const { login } = useLogin({ redirect: '/' });
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation((data: mutationData) => UserApi.register(data.username, data.password, data.email), {
        onError: (error) => {
            console.error('Failed to register user:', error);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['users']);
            login({password: variables.password, username: variables.username});
        },
    });


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // setUsername((document.getElementById("nickname") as HTMLInputElement).value);
        // setPassword((document.getElementById("password") as HTMLInputElement).value);
        // setConfirmPassword((document.getElementById("confirmPassword") as HTMLInputElement).value);
        // setEmail((document.getElementById("email") as HTMLInputElement).value);
        const username = (document.getElementById("nickname") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        if (username != "" && password != "" && email != "") {
            if (password !== confirmPassword) {
                setErrorMessage("Hesla se neshodují");
                console.log("ERROR 1");
            }
            else if (!email.match(emailPattern)) {
                setErrorMessage("E-mail je v nesprávném formátu");
                console.log("ERROR 2");
            }
            else if (password.length < 8) {
                setErrorMessage("Heslo je příliš krátké");
                console.log("ERROR 3");
            }
            else {
                console.log("registrace");
                mutation.mutate({email: email, password: password, username: username});
                console.log("konec");
            }
        }
    };


    return (
        <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="nickname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nickname" placeholder="Přezdívka" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Heslo" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="confirmPassword" placeholder="Znovu Heslo" required />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    <input id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="Email" required />
                </label>
            </div>
            <div className="mb-4 flex items-center">
                <input className="mr-2" type="checkbox" name="terms" required />
                <label id="agree" className="text-sm font-bold" htmlFor="terms">
                    <div className='text-black'>Souhlasím</div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Registrovat se</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>X</button>
            </div>
            <div className="mb-4 flex items-center">
                <label id="error">{errorMessage}</label>
            </div>
        </form>
    );
};
