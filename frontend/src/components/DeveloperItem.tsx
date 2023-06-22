import { Link } from 'react-router-dom';
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
                <Link to={`/developers/${developer.id}`}>
                    <div className="font-bold text-xl mb-2 hover:underline">{developer.name}</div>
                </Link>
                <p className="text-gray-700 text-base">
                    {developer.description.length > 100 ? `${developer.description.substring(0, 100)}...` : developer.description}
                </p>
            </div>
        </div>
    );
};
