import { Game } from '../models';

interface PhotosProps {
    game: Game;
    setSelectedImage: Function;
}

interface GridProps {
    numColumns: number;
    game: Game;
    setSelectedImage: Function;
}

const ImagesGrid: React.FC<GridProps> = ({ game, setSelectedImage }) => {
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <>
            {game.photos.map((image, index) =>
                <div
                    className="p-2 border-4 flex items-center justify-center"
                    key={index}
                    onClick={() => handleImageClick(image)}
                >
                    <img
                        src={image}
                        alt={`Obrázek ${index + 1}`}
                        className="object-cover max-w-full max-h-full"
                    />
                </div>
            )}
        </>
    );
}


export const Photos: React.FC<PhotosProps> = ({ game, setSelectedImage }) => {
    return (
        <div className="container">
            <div className="hidden sm:block">
                <div className={`grid grid-cols-${3} gap-2`}>{<ImagesGrid game={game} numColumns={3} setSelectedImage={setSelectedImage} />}</div>
            </div>
            <div className='block sm:hidden'>
                <div className={`grid grid-cols-${1} gap-2`}>{<ImagesGrid game={game} numColumns={1} setSelectedImage={setSelectedImage} />}</div>
            </div>
        </div>
    );
}