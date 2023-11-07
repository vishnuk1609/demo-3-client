import React from "react";
import Navbar from "../Components/Navbar";
import ProductsListTable from "../Components/ProductsListTable";

const HomePage = () => {
    return (
        <>
            <div className="h-screen flex flex-col">
                <Navbar />
                <div className="max-h-full flex flex-col items-center mt-20">
                    <ProductsListTable />
                </div>
            </div>
        </>
    );
};

export default HomePage;
