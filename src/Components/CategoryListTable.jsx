import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { getAllCategory, deleteCategory } from "../Services/CategoryServices";
import ModalLayout from "../Layouts/ModalLayout";
import AddCategoryModal from "./Modal/AddCategoryModal";
import toast from "react-hot-toast";
import EditCategoryModal from "./Modal/EditCategoryModal";

const CategoryListTable = () => {
    const [category, setCategory] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [editCategoryData, setEditcategoryData] = useState({});
    const [editCategoryId, setEditCategoryId] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    // for fetching all category
    const fetchData = () => {
        getAllCategory()
            .then((res) => {
                console.log(res);
                setCategory(res.data.data);
            })
            .catch((error) => console.log(error));
    };

    // handling delete category
    const handleDeleteCategory = (catId) => {
        deleteCategory(catId)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                fetchData();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    return (
        <>
            <div className=" w-10/12">
                <div className="mb-5 flex w-full justify-end items-center">
                    {/* <div>
                        <input
                            className=" w-[500px] p-1.5 rounded-md border-2 border-black"
                            type="search"
                            placeholder="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <button
                            className=" bg-indigo-600 text-white rounded-md px-5 py-2 hover:bg-indigo-700"
                            onClick={() => {
                                setShowAddCategoryModal(true);
                            }}
                        >
                            Create new category
                        </button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left border-2 border-black">
                        <thead className="text-xs uppercase bg-gray-50 border-2 border-black">
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category &&
                                category.map((data, i) => (
                                    <tr className="border" key={data._id}>
                                        <td className="px-6 py-4 font-medium">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {data.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-4">
                                                <div
                                                    className=" hover:cursor-pointer"
                                                    onClick={() =>
                                                        handleDeleteCategory(
                                                            data._id
                                                        )
                                                    }
                                                >
                                                    <AiFillDelete
                                                        color="red"
                                                        size={20}
                                                    />
                                                </div>
                                                <div
                                                    className=" hover:cursor-pointer"
                                                    onClick={() => {
                                                        setShowEditCategoryModal(
                                                            true
                                                        );
                                                        setEditCategoryId(
                                                            data._id
                                                        );
                                                        setEditcategoryData({
                                                            name: data.name,
                                                            description:
                                                                data.description,
                                                        });
                                                    }}
                                                >
                                                    <BiSolidEdit
                                                        color="blue"
                                                        size={20}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for adding new category */}
            <ModalLayout
                isVisible={showAddCategoryModal}
                onClose={() => setShowAddCategoryModal(false)}
            >
                <AddCategoryModal
                    onClose={() => setShowAddCategoryModal(false)}
                    fecthData={() => fetchData()}
                />
            </ModalLayout>

            {/* Modal for editing existing category */}
            <ModalLayout
                isVisible={showEditCategoryModal}
                onClose={() => setShowEditCategoryModal(false)}
            >
                <EditCategoryModal
                    onClose={() => setShowEditCategoryModal(false)}
                    fetchData={() => fetchData()}
                    catData={editCategoryData}
                    catId={editCategoryId}
                />
            </ModalLayout>
        </>
    );
};

export default CategoryListTable;
