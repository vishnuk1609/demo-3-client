import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../Services/UserServices";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFromData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) navigate("/", { state: location, replace: true });
    });

    const handleRegister = () => {
        signup(formData)
            .then((res) => {
                toast.success(res.data.message);
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    // handling the inputchages
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFromData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <div className="h-screen">
                <div className=" min-h-full flex flex-col flex-1 justify-center items-center px-6 py-12">
                    <h2 className="text-2xl mt-10 text-center font-bold">
                        Create new account
                    </h2>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border border-black py-1.5 px-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        value={formData.userName}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border border-black py-1.5 px-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        value={formData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border border-black py-1.5 px-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        value={formData.password}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                                    onClick={handleRegister}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <p className="mt-5">
                            Already have account{" "}
                            <Link to={"/login"}>
                                <span className="text-blue-700 hover:cursor-pointer font-bold">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
