import { useEffect } from "react";
// import { useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    // const [trailerId , setTrailerId] = useState(null);
    //this state variable will not be required when we are using redux store as the trailer key will be fetched from that store directly.

    useEffect(() => {
        if (!movieId) return; // Prevent fetch if movieId is not available

        //fetch trailer video
        const getMovieVideos = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch trailer video");
                }

                const json = await data.json();
                // console.log(json);

                const filterData = json.results.filter(video => video.type === "Trailer");
                // console.log(filterData);
                const trailer = filterData.length ? filterData[0] : json.results[0];
                // if the filterData have Trailer then it will show first Trailer otherwise 
                // if there is no trailer then it will show whatever the first video no matter what type of the video is there.
                // console.log(trailer);
                // setTrailerId(trailer.key)

                if (trailer) {
                    dispatch(addTrailerVideo(trailer));
                }
            } catch (error) {
                console.error("Error fetching movie trailer:", error);
            }
        };

        getMovieVideos();
    }, [movieId, dispatch]);
};

export default useMovieTrailer;
