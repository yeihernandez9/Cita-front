import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFount";
import LayoutPrivate from "../layout/LayoutPrivate";
import Register from "../pages/Register/Register";
import CreateAppointment from "../pages/Appointment/CreateAppointment";
import ListAppointment from "../pages/Appointment/ListAppointment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/dashboard",
                element: <LayoutPrivate />,
                children: [
                    {
                        index: true,
                        element:<Dashboard/>
                    },
                    {
                        path: "listAppointment",
                        element: <ListAppointment />
                    },
                    {
                        path: "crateAppointment/edit/:appointmentId",
                        element: <CreateAppointment />
                    },
                    {
                        path: "crateAppointment",
                        element: <CreateAppointment />
                    },
                ]
            },
        ],
    },
    
]);
