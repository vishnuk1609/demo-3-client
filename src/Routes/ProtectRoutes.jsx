import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectRoutes = () => {
    let currentUser;
    const location = useLocation();

    if (localStorage.getItem("jwtToken")) {
        currentUser = localStorage.getItem("jwtToken");
    }

    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectRoutes;
