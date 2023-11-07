import logo from './logo.svg';
import './App.css';
import SignUp from './pages/auth/SignUp';
import { HashRouter, Route, Routes } from "react-router-dom";
import {  ProtectedRoutes, authRoutes } from './routes/routes';
import PublicMain from './pages/auth';
import { ToastContainer } from "react-toastify";
import Layout from './components/ProtectedLayout';
import NotFound from './components/NotFound';

function App() {
  return (
    <HashRouter>
    <ToastContainer
      data-testid="app-component"
      position="top-right"
      autoClose={5000}
      draggable
    />
    <Routes>
      <Route path="/" Component={PublicMain}>
        {authRoutes.map((index) => (
          <Route path={index.path} element={index.component} />
        ))}
      </Route>

    
      <Route path="/" Component={Layout}>
        {ProtectedRoutes.map((index) => (
          <Route path={index.path} element={index.component} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </HashRouter>
  );
}

export default App;
