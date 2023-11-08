import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import ProductsListTable from "../Components/ProductsListTable";
import { useDispatch, useSelector } from "react-redux";
import { proudctList } from "../Redux/products/actions";
import toast from "react-hot-toast";

const HomePage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector(
        (state) => state.productData
    );

    if (error) {
        toast.error(error);
    }

    useEffect(() => {
        dispatch(proudctList());
    }, []);

    return (
        <>
            <div className="h-screen flex flex-col dark:bg-gray-900 transition-colors duration-1000">
                <Navbar />
                <div className="max-h-full flex flex-col items-center mt-20 dark:text-white">
                    {isLoading && <div>Loading....</div>}
                    {!isLoading && !error && (
                        <ProductsListTable products={data} />
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;
