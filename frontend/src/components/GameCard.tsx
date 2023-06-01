import { Game } from "../models";

type GameCardProps = Game;

export const GameCard: React.FC<GameCardProps> = ({ ...game }) => {
    return (
        <div className='flex flex-col w-1/2 h-full bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 m-4'>
            <div className='flex flex-row'>
                <div className='inline-flex w-1/3'>
                    <img src={game.cover} className='mx-auto my-2 object-cover rounded-md shadow-md' alt={game.name} />
                </div>
                <div className='flex flex-col w-auto pt-3 gap-1 pl-4'>
                    <h1 className='text-2xl font-bold text-gray-700'>{game.name}</h1>
                    <div className='text-gray-500'>
                        {game.developers.map((developer, index) => {
                            return (
                                <span key={index} className='text-lg font-medium'>{developer.name}</span>
                            );
                        })}
                    </div>
                    <h2 className='text-lg text-gray-600'>{game.releaseDate}</h2>
                    <div className='text-gray-500 mb-4'>
                        {game.genres.map((genre, index) => {
                            return (
                                <span key={index} className='text-base'>{genre.type}</span>
                            );
                        })}
                    </div>
                </div>
            </div>
            <p className='text-base text-gray-700'>{game.description}</p>
        </div>
    )
}  
