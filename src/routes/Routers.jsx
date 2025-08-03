import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "../components/Layout";
import {App} from "../App";
import {NotFoundPage} from "../components/NotFoundPage";
import {Abouts} from "../components/Abouts";
import {ProtectRoute} from "../utilites/ProtectRoute";
import {SingUp} from "../authentification/Singup";

export const Routes = React.memo(() => {
    const browserRoutes = createBrowserRouter([{
        path: '/',
        element: <ProtectRoute><Layout /></ProtectRoute>,
        children: [
            {
                path: '/singUp',
                element: <SingUp />,
            },
           {
                path: '/home',
                element:  <App/> ,
            },
            {
                path: '/about',
                element: <Abouts />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            }
        ]}]);

    return <RouterProvider router={browserRoutes} /> 

})