import { MouseEventHandler, useState } from 'react';
import { User } from '../../models';
import { UserApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteUserProps {
    handleClose: MouseEventHandler;
    userId: string,
    users: User[],
}

export const DeleteUserConfirm: React.FC<DeleteUserProps> = ({ handleClose, userId }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(() => UserApi.remove(userId), {
        onError: (error) => {
            console.error('Failed to remove the user:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const deleteUser = async (event: React.MouseEvent) => {
        mutation.mutate();
        handleClose(event);
    };

    return (
        <div className='border-2 border-black-1000'>
            <form className="p-6 bg-white rounded shadow-md">
                <p>Opravdu chcete smazat uživatele?</p>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="button" onClick={(event) => { deleteUser(event); }}  >Potvrdit</button>
                    <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClose}>Storno</button>
                </div>
            </form>
        </div>
    );
};


interface UsersCRUDProps {
    users: User[];
}

export const UsersCRUD: React.FC<UsersCRUDProps> = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [page, setPage] = useState(0);
    const itemsPerPage = 5;

    const handleNextPage = () => {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="p-6 space-y-4 w-full md:w-3/4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Uživatelé</h1>
                </div>
                <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Hledat uživatele..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredUsers.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(user => (
                        <div key={user.id} className="p-4 bg-white rounded shadow">
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <div className="mt-4 space-x-4">
                                <button className="w-auto px-4 py-2 text-white bg-red-500 rounded-md border-red-800" onClick={() => setUserToDelete(user.id)}>Smazat</button>
                                {userToDelete === user.id && (
                                    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
                                        <DeleteUserConfirm handleClose={() => setUserToDelete(null)} userId={user.id} users={users} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePreviousPage}
                            className={`px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
                            disabled={page === 0}
                        >
                            Předchozí
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={`px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredUsers.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                            disabled={filteredUsers.length <= (page + 1) * itemsPerPage}
                        >
                            Další
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};
