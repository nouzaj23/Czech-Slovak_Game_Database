import { Game } from '../models';

interface PhotosProps {
    game: Game;
    setSelectedImage: Function;
}


export const Photos: React.FC<PhotosProps> = ({ game, setSelectedImage }) => {
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const ImagesGrid = (numColumns: number) => {
        const numRows: number = Math.ceil(game.photos.length / numColumns);

        const gridItems = [];

        for (let row: number = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const index = row * numColumns + col;
                if (index < game.photos.length) {
                    const image = game.photos[index];
                    gridItems.push(
                        <div className="col-span-1 p-2 border-4 flex items-center justify-center" key={index}>
                            <div
                                className={`aspect-w-1 aspect-h-1 cursor-pointer`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Obrázek ${index + 1}`} className="object-cover max-w-full max-h-full" />
                            </div>
                        </div>

                    );
                }
            }
        }
        return gridItems;
    }

    return (
        <div className="container">
            <div className="hidden sm:block">
                <div className={`grid grid-cols-${3} gap-2`}>{ImagesGrid(3)}</div>
            </div>
            <div className='block sm:hidden'>
                <div className={`grid grid-cols-${1} gap-2`}>{ImagesGrid(1)}</div>
            </div>
        </div>
    );
}