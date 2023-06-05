import { Developer } from '../models';

interface DeveloperItemProps {
    developer: Developer;
}

export const DeveloperItem: React.FC<DeveloperItemProps> = ({ developer }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="w-full h-48 bg-gray-300 flex justify-center border-b-2 border-black">
                <img
                    className="max-h-full object-fill"
                    src={developer.avatar}
                    alt="Developer avatar"
                />
            </div>
            <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2">{developer.name}</div>
                <p className="text-gray-700 text-base">
                    {developer.description}
                </p>
            </div>
        </div>
    );
};
