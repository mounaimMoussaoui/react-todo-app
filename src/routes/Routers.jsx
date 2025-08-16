import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "../components/Layout";
import {App} from "../App";
import {NotFoundPage} from "../components/NotFoundPage";
import {Abouts} from "../components/Abouts";
import {ProtectRoute} from "../utilites/ProtectRoute";
import {Signup} from "../authentification/Signup";
import AuthenticationProvider from "../contexts/AuthenticationProvider";
import {Login} from "../authentification/Login";

export const Routes = React.memo(() => {
    const browserRoutes = createBrowserRouter([
        {
            path: '/login',
            element: <AuthenticationProvider><Login/></AuthenticationProvider>,
        },
        {
            path: '/signup',
            element: <AuthenticationProvider> <Signup/></AuthenticationProvider>,
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
                    path: '/About',
                    element: <Abouts />,
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage />,
        }
        ]);

    return <RouterProvider router={browserRoutes} />
})