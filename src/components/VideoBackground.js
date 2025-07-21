
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({movieID}) =>{

    const trailerVideo = useSelector(store => store.movies?.trailerVideo)

    useMovieTrailer(movieID);



    return(
        <div className="w-screen">

            <iframe 
            className="w-screen aspect-video"
            src={"https://www.youtube.com/embed/"+trailerVideo?.key}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            ></iframe>


        </div>
    )
};
export default VideoBackground;


