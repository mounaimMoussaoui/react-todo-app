import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "../components/Layout";
import {App} from "../App";
import {NotFoundPage} from "../components/NotFoundPage";
import {Abouts} from "../components/Abouts";
import {ProtectRoute} from "../utilites/ProtectRoute";
import {SingUp} from "../authentification/Singup";
import AuthenticationProvider from "../contexts/AuthenticationProvider";
import {Login} from "../authentification/Login";

export const Routes = React.memo(() => {
    const browserRoutes = createBrowserRouter([{
        path: '/',
        element: <Layout />,
        children: [
            {
              path: "/login",
              element: <Login />,
            },
           {
                path: '/singUp',
                element: <AuthenticationProvider><SingUp /></AuthenticationProvider>,
            },
           {
                path: '/home',
                element: <ProtectRoute> <App/> </ProtectRoute> ,
            },
            {
                path: '/about',
                element: <ProtectRoute><Abouts /></ProtectRoute>,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            }
        ]}]);

    return <RouterProvider router={browserRoutes} /> 

})