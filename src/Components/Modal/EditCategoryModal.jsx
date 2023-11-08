import { useState } from "react";
import { editCategory } from "../../Services/CategoryServices";
import toast from "react-hot-toast";

const EditCategoryModal = ({ onClose, fetchData, catData, catId }) => {
    const [categoryData, setCategoryData] = useState(catData);
    const [categoryId, setCategoryId] = useState(catId);

    // for handling updatecategory
    const hanldeOnSave = () => {
        editCategory(categoryId, categoryData)
            .then((res) => {
                toast.success(res.data.message);
                onClose();
                fetchData();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    // for handling input changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({
            ...categoryData,
            [name]: value,
        });
    };

    return (
        <>
            <div className="w-[400px] h-70 p-5">
                <div>
                    <h1 className=" uppercase font-bold tracking-wide text-xl">
                        Edite Category
                    </h1>
                </div>
                <div className=" space-y-3 mt-3 tracking-wider font-semibold text-gray-700 dark:text-white">
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Name</div>
                        <div className="text-black ">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={categoryData.name}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Description</div>
                        <div className="text-black ">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={categoryData.description}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className=" flex w-full space-x-1 justify-end">
                        <button
                            className=" bg-red-600 rounded-md px-4 py-2 text-white tracking-wider hover:bg-red-700"
                            onClick={() => onClose()}
                        >
                            Close
                        </button>
                        <button
                            className=" bg-indigo-600 rounded-md px-4 py-2 text-white tracking-wider hover:bg-indigo-800"
                            onClick={hanldeOnSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCategoryModal;
