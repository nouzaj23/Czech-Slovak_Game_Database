import { MouseEventHandler, useState } from 'react';
import { Developer } from '../../models';
import { EditDeveloper } from '../Editors/EditDeveloper';
import { DeveloperApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface DeleteDeveloperProps {
    handleClose: MouseEventHandler;
    developerId: string,
    developers: Developer[],
}

export const DeleteDevConfirm: React.FC<DeleteDeveloperProps> = ({ handleClose, developerId }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(() => DeveloperApi.remove(developerId), {
        onError: (error) => {
            console.error('Failed to delete the developer:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['developers']);
        },
    });

    const deleteDev = async (event: React.MouseEvent) => {
        mutation.mutate();
        handleClose(event);
    };

    return (
        <div className='border-2 border-black-1000'>
            <form className="p-6 bg-white rounded shadow-md">
                <p>Opravdu chcete smazat žánr?</p>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="button" onClick={(event) => { deleteDev(event); }}  >Potvrdit</button>
                    <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClose}>Storno</button>
                </div>
            </form>
        </div>
    );
};


interface DevelopersCRUDProps {
    developers: Developer[];
}

export const DevelopersCRUD: React.FC<DevelopersCRUDProps> = ({ developers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editedDeveloperId, setEditedDeveloperId] = useState<string | null>(null);
    const [developerToDelete, setDeveloperToDelete] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    const filteredDevelopers = developers.filter(dev =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(() => DeveloperApi.add("Nový vývojář", "Popis", ""), {
        onError: (error) => {
            console.error('Failed to add the developer:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['developers']);
        },
    });

    const addDeveloper = () => {
        mutation.mutate();
    }

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
                    <h1 className="text-2xl font-semibold">Studia</h1>
                    <button className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md" onClick={addDeveloper}>Přidat studio</button>
                </div>
                <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Hledat studio..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {filteredDevelopers.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(dev => (
                    <div key={dev.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-semibold">{dev.name}</h2>
                        <div className="mt-2 space-y-2">
                            <p>{dev.description}</p>
                        </div>
                        <div className="mt-4 space-x-4">
                            <button
                                className="w-auto px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md"
                                onClick={() => setEditedDeveloperId(editedDeveloperId === dev.id ? null : dev.id)}
                            >
                                Upravit
                            </button>
                            <button className="w-auto px-4 py-2 text-white bg-red-500 rounded-md border-red-800" onClick={() => setDeveloperToDelete(dev.id)}>Smazat</button>
                            {developerToDelete === dev.id && (
                                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
                                    <DeleteDevConfirm handleClose={() => setDeveloperToDelete(null)} developerId={dev.id} developers={developers} />
                                </div>
                            )}
                        </div>
                        {editedDeveloperId === dev.id && (
                            <div className='mt-5'>
                                <EditDeveloper editedDeveloperId={dev.id} developerProp={dev} />
                            </div>
                        )}
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
                        className={`px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredDevelopers.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                        disabled={filteredDevelopers.length <= (page + 1) * itemsPerPage}
                    >
                        Další
                    </button>
                </div>
            </div>
        </div>
    );
};
