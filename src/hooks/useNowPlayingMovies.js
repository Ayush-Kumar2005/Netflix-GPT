import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
    // Fetch Data from TMDB API and update store.
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);

            if (!data.ok) {
                throw new Error("Failed to fetch Now Playing movies");
            }

            const json = await data.json();
            // console.log(json.results);
            if (json?.results?.length) {
                dispatch(addNowPlayingMovies(json.results));
            }
        } catch (error) {
            console.error("Error fetching now playing movies:", error);
        }
    };

    useEffect(() => {
        getNowPlayingMovies();
    }, [dispatch]);

    // This API is called twice every times due to the "React.StrictMode" that is written in "index.js" file.
    // React does extra rendering of your components to check some inconsistencies between your calls.
    // If you want to remove the calling the API twice then remove React.StrictMode.
    // These type of API calls twice happens in our local when we are developing our app but 
    // if you make it build for production then it will be called ones.
};

export default useNowPlayingMovies;
