const VideoTitle = ({title , overview}) =>{
    return(
        <div className="pt-[15%] px-[5%] absolute text-white bg-gradient-to-r from black" >
            <h1 className="text-6xl font-bold" >{title}</h1>
            <p className="py-6 text-lg w-2/5" >{overview}</p>
            <div className="flex mt-6">

                <button className=" w-36 bg-gray-500 text-white  py-2 mx-2 flex justify-center items-center gap-2 rounded bg-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path d="M5 3v18l15-9-15-9z" />
                </svg>
                Play
                </button>


                <button className="w-36  bg-gray-500 text-white  py-2 mx-2 flex flex justify-center items-center gap-2 rounded bg-opacity-50">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                        10-4.48 10-10S17.52 2 12 2zm0 4a1.5 1.5 0 1 1 0 3 
                        1.5 1.5 0 0 1 0-3zm1 12h-2v-6h2v6z" />
                </svg>
                More info
                </button>

            </div>
        </div>
    )
};
export default VideoTitle;