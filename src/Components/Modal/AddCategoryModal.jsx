import { useState } from "react";
import { createNewCategory } from "../../Services/CategoryServices";
import toast from "react-hot-toast";

const AddCategoryModal = ({ onClose, fecthData }) => {
    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    const handleCreateCategory = () => {
        createNewCategory(category)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                fecthData();
                onClose();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    // for handling input box changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    return (
        <>
            <div className="w-[400px] h-70 p-5">
                <div>
                    <h1 className=" uppercase font-bold tracking-wide text-xl">
                        Crate new Category
                    </h1>
                </div>
                <div className=" space-y-3 mt-3 tracking-wider font-semibold text-gray-700">
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Name</div>
                        <div className="text-black">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={category.name}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Description</div>
                        <div className="text-black">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={category.description}
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
                            onClick={handleCreateCategory}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategoryModal;
