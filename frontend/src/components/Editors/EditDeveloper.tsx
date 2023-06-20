import { useCallback, useState } from "react";
import { Developer } from "../../models";
import { EditDeveloperAvatar, EditDeveloperDescribtion, EditDeveloperName } from "./EditDeveloperOperations";
import { DeveloperApi } from "../../services";

interface EditDeveloperProps {
    developerProp: Developer;
    editedDeveloperId: string;
}

export const EditDeveloper: React.FC<EditDeveloperProps> = ({ developerProp, editedDeveloperId }) => {
    const [developer, setDeveloper] = useState(developerProp);

    const updateDeveloper = useCallback(async () => {
        try {
            await DeveloperApi.update(developer.id, developer.name, developer.description, developer.avatar);
            // setDevelopers((devs: Developer[]) => devs.map(dev => dev.id === developer.id ? { ...dev, name: developer.name, avatar: developer.avatar } : dev));
        } catch (error) {
            console.error('Failed to update the developer:', error);
        }
    }, [developer]);

    return (
        <div>
            {editedDeveloperId === developer.id && (
                <form className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Upravit studio</h3>
                    <div className="space-y-5">
                        <EditDeveloperName developer={developer} updateDeveloper={setDeveloper} />
                        <EditDeveloperDescribtion developer={developer} updateDeveloper={setDeveloper} />
                        <EditDeveloperAvatar developer={developer} updateDeveloper={setDeveloper} />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                        type="submit" onClick={(event) => { event.preventDefault(); updateDeveloper() }}>
                        Uložit změny
                    </button>
                </form>
            )
            }
        </div >
    )
}