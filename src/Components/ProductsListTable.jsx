import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { getAllProducts, deleteProduct } from "../Services/ProductServices";
import ModalLayout from "../Layouts/ModalLayout";
import AddProductModal from "./Modal/AddProductModal";
import toast from "react-hot-toast";
import EditProductModal from "./Modal/EditProductModal";
import { useAuth } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { proudctList } from "../Redux/products/actions";

const ProductsListTable = ({ products }) => {
    // const [products, setProducts] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [editProductId, setEditProductId] = useState("");
    const [editProductData, setEditProductData] = useState({});
    const { user } = useAuth();
    const dispatch = useDispatch();

    // for handling delete product
    const handleDeleteProduct = (prodId) => {
        deleteProduct(prodId)
            .then((res) => {
                toast.success(res.data.message);
                dispatch(proudctList());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className=" w-10/12">
                <div className="mb-5 flex w-full justify-end items-center">
                    <div>
                        <button
                            className=" bg-green-600 text-white rounded-md px-5 py-2 hover:bg-green-700"
                            onClick={() => {
                                if (user && user?.role?.includes("Admin")) {
                                    setShowAddProductModal(true);
                                } else {
                                    toast.error("Admin persmission required");
                                }
                            }}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left border-2 border-black">
                        <thead className="text-xs uppercase bg-gray-50 border-2 border-black dark:bg-indigo-950">
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Stock</th>
                                {user && user?.role?.includes("Admin") ? (
                                    <th className="px-6 py-3">Actions</th>
                                ) : (
                                    ""
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((data, i) => (
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
                                            ${data.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.stock}
                                        </td>
                                        {user &&
                                        user?.role?.includes("Admin") ? (
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-4">
                                                    <button
                                                        className=" hover:cursor-pointer"
                                                        onClick={() => {
                                                            handleDeleteProduct(
                                                                data._id
                                                            );
                                                        }}
                                                    >
                                                        <AiFillDelete
                                                            color="red"
                                                            size={20}
                                                        />
                                                    </button>
                                                    <button
                                                        className=" hover:cursor-pointer"
                                                        onClick={() => {
                                                            setShowEditProductModal(
                                                                true
                                                            );
                                                            setEditProductId(
                                                                data._id
                                                            );
                                                            setEditProductData({
                                                                name: data.name,
                                                                description:
                                                                    data.description,
                                                                price: data.price,
                                                                category:
                                                                    data
                                                                        .category
                                                                        ._id,
                                                                stock: data.stock,
                                                            });
                                                        }}
                                                    >
                                                        <BiSolidEdit
                                                            color="blue"
                                                            size={20}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        ) : (
                                            ""
                                        )}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add product modal */}
            <ModalLayout
                isVisible={showAddProductModal}
                onClose={() => setShowAddProductModal(false)}
            >
                <AddProductModal
                    onClose={() => setShowAddProductModal(false)}
                />
            </ModalLayout>

            {/* Edit product modal */}
            <ModalLayout
                isVisible={showEditProductModal}
                onClose={() => setShowEditProductModal(false)}
            >
                <EditProductModal
                    onClose={() => setShowEditProductModal(false)}
                    prodData={editProductData}
                    prodId={editProductId}
                />
            </ModalLayout>
        </>
    );
};

export default ProductsListTable;
