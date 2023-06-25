import ReactPlayer from 'react-player';
import { Game } from '../models';

interface VideosProps {
    game: Game;
}

export const Videos: React.FC<VideosProps> = ({ game }) => {
    return (
        <div className='container'>
            {game.videos.map((video, index) =>
                <div key={index} className="w-full h-screen flex items-center justify-center mt-5">
                    <ReactPlayer
                        url={video}
                        controls={true}
                        width='100%'
                        height='100%'
                    />
                </div>
            )}
        </div>
    );
}