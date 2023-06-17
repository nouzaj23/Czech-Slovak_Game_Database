import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "../services";
import { useNavigate } from "react-router-dom";

type UseLoginProps = {
    redirect: string;
}

const useLogout = ({ redirect }: UseLoginProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { mutateAsync: logout, isLoading, isError } = useMutation({
        mutationFn: () => AuthApi.logout(),
        onSuccess: () => {
            navigate(redirect);
            queryClient.invalidateQueries(['auth']);
            // queryClient.resetQueries(['auth']);
        },
    })

    return { logout, isLoading, isError };
}

export default useLogout;