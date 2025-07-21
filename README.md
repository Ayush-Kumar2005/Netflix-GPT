# Netflix GPT

- Create React App
- Configured Tailwind CSS
- Header
- Routing of App
- Login form
- Sign up form
- Form Validation
- useRef Hook
- Supabase Setup
- Create Sign up in supabase
- implement signup user api
- created redux store with userSlice
- Implemented Sign out
- Update Username
- Bug Fix:- Sign up user displayName update
- Bug Fix:- If the user is not logged in redirect  /browse to Login Page and vice versa
- Fetch from TMDB movies
- Unsubscribed to the onAuthStateChanged callback
- Registered TMDB API and get access token
- Get Data from TMDB " now playing movies list" API`
- Make the custom hook naming useNowPlayingMovies
- Structure of Browse page
    {
        MainContainer
            - Video Background
            - Video Title
        Secondary Container
            - MovieList* n
            - cards * n
    }

# Features
-Login/Sign up
    -Sign In / Sign Up from
    -redirect to Browse page
-Browse(After Authentication)
    -Header
    -Main Movie
        -Trailer in Background
        -Title & Description
        -Movie Suggestions
            -Movie Lists * N
-NetflixGPT
    -Search Bar
    -Movie Recommendations

