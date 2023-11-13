import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import EnterMovies from "../pages/movies/EnterMovies";
import ShowMovies from "../pages/movies/ShowMovies";
import ShowDetails from "../pages/movies/ShowMovies/ShowDetails";
import ViewMovies from "../pages/movies/ViewMovies";
import ProfilePage from "../pages/profile";

const ProtectedRoutes = [
    //authencation page
 
    {path:"Movies",component:<ViewMovies />},
    {path:"EnterMovies",component:<EnterMovies />},
    {path:"profilePage",component:<ProfilePage />},
    {path:"ShowMovies",component:<ShowMovies />},
    { path: "ShowMovies/:id", component: <ShowDetails/> },
  ];


  const authRoutes = [
  {
    path:"",component:<Login />,
  },

  {
    path:"SignUp",component:<SignUp />,
  }
  ] 
  export  {ProtectedRoutes , authRoutes}