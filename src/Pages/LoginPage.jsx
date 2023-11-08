import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../Services/UserServices";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    const [formData, setFromData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) navigate("/", { state: location, replace: true });
    });

    // for handling the login
    const handleLogin = () => {
        login(formData)
            .then((res) => {
                localStorage.setItem("jwtToken", res.data.data[0].token);
                localStorage.setItem("Role", res.data.data[0].user.role[0]);
                setUser(res.data.data[0].user);
                toast.success(res.data.message);
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    // handling the inputchanges
    const handleOnchange = (e) => {
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
                        Login
                    </h2>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
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
                                        onChange={handleOnchange}
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
                                        onChange={handleOnchange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <p className="mt-5">
                            Don't have account?{" "}
                            <Link to={"/register"}>
                                <span className="text-blue-700 hover:cursor-pointer font-bold">
                                    Register
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
