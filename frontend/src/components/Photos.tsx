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

const ImagesGrid: React.FC<GridProps> = ({ numColumns, game, setSelectedImage }) => {
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    // const numRows: number = Math.ceil(game.photos.length / numColumns);
    // const gridItems = [];

    // for (let row: number = 0; row < numRows; row++) {
    //     for (let col = 0; col < numColumns; col++) {
    //         const index = row * numColumns + col;
    //         if (index < game.photos.length) {
    //             gridItems.push(
    //                 <div className="col-span-1 p-2 border-4 flex items-center justify-center" key={index}>
    //                     <div
    //                         className={`aspect-w-1 aspect-h-1 cursor-pointer`}
    //                         onClick={() => handleImageClick(game.photos[index])}
    //                     >
    //                         <img src={game.photos[index]} alt={`Obrázek ${index + 1}`} className="object-cover max-w-full max-h-full" />
    //                     </div>
    //                 </div>

    //             );
    //         }
    //     }
    // }
    // return gridItems;
    return (
        <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${numColumns}, 1fr)`, gap: '1em' }}>
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
        </div>
    )
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