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
    const browserRoutes = createBrowserRouter([
        {
            path: '/signup',
            element: <AuthenticationProvider> <SingUp/> </AuthenticationProvider>,
        },

        {
            path: '/',
            element: <ProtectRoute><Layout /></ProtectRoute>,
            children: [
                {
                    path: '/',
                    element:  <App/>  ,
                },
                {
                    path: '/about',
                    element: <Abouts />,
                },
            ]
        },
        {
            path: '/login',
            element: <AuthenticationProvider><Login/> </AuthenticationProvider>,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
        ]);

    return <RouterProvider router={browserRoutes} /> 

})