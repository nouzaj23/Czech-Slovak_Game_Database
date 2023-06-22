import { Developer } from "../../models";

interface EditDeveloperProps {
    developer: Developer ;
    updateDeveloper: Function;
}

export const EditDeveloperName: React.FC<EditDeveloperProps> = ({ developer, updateDeveloper }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Název studia</label>
            <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={developer.name}
                onChange={(event) => updateDeveloper({ ...developer, name: event.target.value })}
            />
        </div>
    )
}

export const EditDeveloperDescription: React.FC<EditDeveloperProps> = ({ developer, updateDeveloper }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Popis studia</label>
            <textarea
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={developer.description}
                onChange={(event) => updateDeveloper({ ...developer, description: event.target.value })}
            />
        </div>
    )
}

export const EditDeveloperAvatar: React.FC<EditDeveloperProps> = ({ developer, updateDeveloper }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Avatar</label>
            <textarea
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={developer.avatar}
                onChange={(event) => updateDeveloper({ ...developer, avatar: event.target.value })}
            />
        </div>
    )
}