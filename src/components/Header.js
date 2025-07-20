import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      navigate("/error")
      console.error("Sign out error:", error.message);
    } else {
      dispatch(removeUser());
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      if (user) {
        dispatch(
          addUser({
            email: user.email,
            uid: user.id,
            displayName: user.user_metadata?.full_name || user.user_metadata?.name || "User",
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });


    // Unsubscribe when components will unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch, navigate]);

  const handleSignIn = () => {
    navigate("/");
  };

  const isAuthPage = location.pathname === "/";

  return (
    <>
      {!isAuthPage && user?.displayName && (
        <div className="fixed top-2 right-10 text-sm text-gray-700 z-20 font-medium">
          Hello, {user.displayName}
        </div>
      )}

      <div className="fixed top-0 left-0 w-screen flex justify-between items-center px-10 py-4 bg-transparent z-10">
        <div className="w-44">
          <img
            className="w-full"
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
          />
        </div>

        {!isAuthPage && (
          <div className="flex items-center space-x-4">
            {user?.email ? (
              <>
                <img
                  className="w-10 h-10 rounded-full"
                  alt="User Icon"
                  src="https://avatars.githubusercontent.com/u/6759280?v=4"
                />
                <button
                  onClick={handleSignOut}
                  className="text-black font-semibold hover:underline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-black font-semibold hover:underline"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
