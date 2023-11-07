import Navbar from "../Components/Navbar";
import CategoryListTable from "../Components/CategoryListTable";

const CategoryPage = () => {

    return (
        <>
            <div className="h-screen flex flex-col">
                <Navbar />
                <div className="max-h-full flex flex-col items-center mt-20">
                    <div></div>
                    <CategoryListTable />
                </div>
            </div>
        </>
    );
};

export default CategoryPage;
