import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "../services";
import { useNavigate } from "react-router-dom";

type UseLoginProps = {
    redirect: string;
}

const useLogin = ({ redirect }: UseLoginProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: login, isLoading, isError } = useMutation({
        mutationFn: (credentials: {username: string, password: string}) => AuthApi.login(credentials.username, credentials.password),
        retry: false,
        onSuccess: () => {
            navigate(redirect);
            queryClient.invalidateQueries(['auth']);
        },
    });

    return { login, isLoading, isError };
}

export default useLogin;