import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import DarkModeSwitch from "./DarkModeSwitch";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const hanldeLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("Role");
        navigate("/login");
    };

    return (
        <>
            <div className="w-full flex h-16 items-center space-x-10 justify-end px-10 transition-colors duration-1000 dark:bg-indigo-900 text-black  dark:text-white border-b-2  border-black">
                <div className="">
                    <DarkModeSwitch />
                </div>
                <div className="">
                    <Link to="/">
                        <h1 className=" font-semibold text-xl tracking-wide hover:cursor-pointer hover:text-gray-500">
                            Products
                        </h1>
                    </Link>
                </div>
                {user?.role?.includes("Admin") && (
                    <div className="">
                        <Link to="/category">
                            <h1 className="  font-semibold text-xl tracking-wide hover:cursor-pointer hover:text-gray-500">
                                category
                            </h1>
                        </Link>
                    </div>
                )}
                <div className="">
                    <h1
                        className=" text-red-600 font-semibold text-xl tracking-wide hover:cursor-pointer hover:text-red-700"
                        onClick={hanldeLogout}
                    >
                        Logout
                    </h1>
                </div>
            </div>
        </>
    );
};

export default Navbar;
