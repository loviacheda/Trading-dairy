import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Signup from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Room from './Pages/Room/Room.jsx';
import './index.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/room/:id',
    element: <Room />,
  },
  {
    path: '/room',
    element: <Room />,
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router}>
        <Route />
      </RouterProvider>
    </div>
  );
}

export default App;

