import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";

import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();
    const isDashboard = pathname.includes("/dashboard");

    return (
        <Suspense
            fallback={
                <LoadingScreen
                    sx={{
                        ...(!isDashboard && {
                            top: 0,
                            left: 0,
                            width: 1,
                            zIndex: 9999,
                            position: "fixed",
                        }),
                    }}
                />
            }
        >
            <Component {...props} />
        </Suspense>
    );
};

export default function RouteApp() {
    return useRoutes([
        {
            path: "auth",
            children: [
                {
                    path: "login",
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    ),
                },
                { path: "login-unprotected", element: <Login /> },
                { path: "register-unprotected", element: <Register /> },
            ],
        },
        {
            path: "dashboard",
            element: (
                // <AuthGuard>
                <DashboardLayout />
                // </AuthGuard>
            ),
            children: [
                { path: "", element: <Navigate to="/dashboard/app" replace /> },
                { path: "app", element: <DashboardLayout /> },
            ],
        },
        {
            path: "*",
            element: <LogoOnlyLayout />,
            children: [
                // { path: "coming-soon", element: <ComingSoon /> },
                // { path: "maintenance", element: <Maintenance /> },
                // { path: "pricing", element: <Pricing /> },
                // { path: "payment", element: <Payment /> },
                { path: "500", element: <Page500 /> },
                { path: "404", element: <NotFound /> },
                { path: "*", element: <Navigate to="/404" replace /> },
            ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}

const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(lazy(() => import("./pages/authentication/Register")));

const Page500 = Loadable(lazy(() => import("./pages/Page500")));
const NotFound = Loadable(lazy(() => import("./pages/Page404")));

