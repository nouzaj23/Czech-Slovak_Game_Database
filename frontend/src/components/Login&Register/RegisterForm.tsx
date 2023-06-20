import { FormEventHandler, MouseEventHandler, useCallback } from 'react';
import useLogin from '../../hooks/useLogin';
import { UserApi } from '../../services';
import { useMutation, useQueryClient } from 'react-query';

interface RegisterFormProps {
    handleClose: MouseEventHandler;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
    const { login } = useLogin({ redirect: '/' })
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
        // const { data: usersData } = useQuery<User[]>(['users'], UserApi.retrieveAllUsers);
        // const users = usersData ?? [];

        e.preventDefault();
        const username = document.getElementById("nickname") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const errorLabel = document.getElementById("error") as HTMLLabelElement;
        if (username != undefined && password != undefined && email != undefined) {
            if (password.value !== confirmPassword.value) {
                errorLabel.textContent = "Hesla se neshodují";
            }
            else if (!email.value.match(emailPattern)) {
                errorLabel.textContent = "E-mail je v nesprávném formátu";
            }
            else if (password.value.length < 8) {
                errorLabel.textContent = "Heslo je příliš krátké";
            }
            // else if (users.some((user: User) => user.username == username.value)) {
            //     errorLabel.textContent = "Uživatel s touto přezdívkou existuje";
            // }
            else {
                const queryClient = useQueryClient();
                useMutation({
                    mutationFn: () => UserApi.register(username.value, password.value, email.value),
                    onSuccess: () => {
                        queryClient.invalidateQueries(['users']);
                    },
                });
            }
        }
    }, [login]);


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
                <label id="error"></label>
            </div>
        </form>
    );
};
