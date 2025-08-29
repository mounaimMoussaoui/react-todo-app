import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "../components/Layout";
import {App} from "../App";
import {NotFoundPage} from "../components/NotFoundPage";
import {About} from "../components/About";
import {ProtectRoute} from "../utilities/ProtectRoute";
import {Signup} from "../authentication/Signup";
import AuthenticationProvider from "../contexts/AuthenticationProvider";
import {Login} from "../authentication/Login";

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
                    path: '/about',
                    element: <About />,
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage />,
        }
        ],
    {
            future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            },
    });

    return <RouterProvider router={browserRoutes} />
})