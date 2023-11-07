import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const ProtectByRole = ({ requiredRolle }) => {
    const { user } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    return user?.role?.includes(requiredRolle) ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from }} replace />
    );
};

export default ProtectByRole;
