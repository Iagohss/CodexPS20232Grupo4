import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/UI/Login.tsx';
import Cadastro from './components/UI/Cadastro.tsx';
import ListaDeTarefas from './components/UI/ListaDeTarefas.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/cadastro',
        element: <Cadastro/>
      },
      {
        path: '/tarefas',
        element: <ListaDeTarefas/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
