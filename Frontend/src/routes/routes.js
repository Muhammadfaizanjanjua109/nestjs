import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import EnterMovies from "../pages/movies/EnterMovies";
import ShowMovies from "../pages/movies/ShowMovies";
import ShowDetails from "../pages/movies/ShowMovies/ShowDetails";
import ViewMovies from "../pages/movies/ViewMovies";

const ProtectedRoutes = [
    //authencation page
 
    {path:"Movies",component:<ViewMovies />},
    {path:"EnterMovies",component:<EnterMovies />},
    {path:"ShowMovies",component:<ShowMovies />},
    { path: "ShowMovies/:id", component: <ShowDetails/> },
  ];


  const authRoutes = [
  {
    path:"Login",component:<Login />,
  },

  {
    path:"SignUp",component:<SignUp />,
  }
  ] 
  export  {ProtectedRoutes , authRoutes}