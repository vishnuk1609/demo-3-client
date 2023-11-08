import Navbar from "../Components/Navbar";
import CategoryListTable from "../Components/CategoryListTable";

const CategoryPage = () => {
    return (
        <>
            <div className="h-screen flex flex-col transition-colors duration-1000 dark:bg-gray-900">
                <Navbar />
                <div className="max-h-full flex flex-col items-center mt-20 dark:text-white">
                    <div></div>
                    <CategoryListTable />
                </div>
            </div>
        </>
    );
};

export default CategoryPage;
