import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import CategoryPage from "../Pages/CategoryPage";
import ProtectRoutes from "./ProtectRoutes";
import ProtectByRole from "./ProtectByRole";

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectRoutes />}>
                <Route path="/" element={<HomePage />} />
                <Route element={<ProtectByRole requiredRolle="Admin" />}>
                    <Route path="/category" element={<CategoryPage />} />
                </Route>
            </Route>
            <Route path="/*" element={<div>Page not found</div>} />
        </Routes>
    );
};

export default Router;
