import { Link, useParams } from "react-router-dom";
import { Developer, Game } from "../models";
import { DeveloperApi, GameApi } from "../services";
import { useQuery } from "@tanstack/react-query";


export const DeveloperPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>404</div>;
    }

    const { data: developerData } = useQuery<Developer>(['developers', id], () => DeveloperApi.retrieveDeveloper(id), {
        enabled: !!id,
    });
    const { data: gamesData } = useQuery<Game[]>(['games', id], () => GameApi.retrieveGamesByDeveloper(id), {
        enabled: !!id,
    });

    const developer = developerData;
    const devGames = gamesData ?? [];

    if (!developer) {
        return <div>Vývojář není k dispozici</div>;
    }

    return (
        <div className="w-full md:w-3/4 mx-auto p-4 bg-white shadow rounded">
            <div className="bg-white shadow-lg rounded-lg p-6 relative" style={{ overflow: 'auto' }}>
                <img src={developer.avatar} alt="Developer avatar" className="w-1/4 object-contain object-top float-left mr-4" />
                <div>
                    <h1 className="text-xl font-bold">{developer.name}</h1>
                    <p className="mt-4 text-gray-600">{developer.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 mt-4">
                {devGames.map((game) => (
                    <Link to={`/games/${game.id}`} key={game.id}>
                        <div className="flex flex-col hover:underline">
                            <img src={game.cover} alt="Game cover" className="w-full my-auto" />
                            <h2 className="text-xl font-bold text-center">{game.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
