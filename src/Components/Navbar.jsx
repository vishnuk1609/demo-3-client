import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

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
            <div className="w-full flex bg-blue-950 h-16 items-center space-x-10 justify-end px-10">
                <div className="">
                    <Link to="/">
                        <h1 className=" text-white font-semibold text-xl tracking-wide hover:cursor-pointer hover:text-gray-500">
                            Products
                        </h1>
                    </Link>
                </div>
                {user?.role?.includes("Admin") && (
                    <div className="">
                        <Link to="/category">
                            <h1 className=" text-white font-semibold text-xl tracking-wide hover:cursor-pointer hover:text-gray-500">
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
