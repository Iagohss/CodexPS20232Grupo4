import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/UI/Autenticacao/Login.tsx';
import Cadastro from './components/UI/Autenticacao/Cadastro.tsx';
import ListaDeTarefas from './components/UI/ListaDeTarefas/ListaDeTarefas.tsx';
import AuthProvider from './components/context/Context.tsx';

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
