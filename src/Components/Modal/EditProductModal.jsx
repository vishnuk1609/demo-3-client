import { useEffect, useState } from "react";
import { getAllCategory } from "../../Services/CategoryServices";
import { editProduct } from "../../Services/ProductServices";
import toast from "react-hot-toast";

const EditProductModal = ({ onClose, fetchData, prodId, prodData }) => {
    const [product, setProduct] = useState(prodData);
    const [productId, setProductId] = useState(prodId);
    const [category, setCategory] = useState([]);

    // for getting the category data
    useEffect(() => {
        getAllCategory()
            .then((res) => {
                setCategory(res.data.data);
            })
            .catch((error) => console.error(error));
    }, []);

    // for handling the edit
    const handleEditeProduct = () => {
        // parsing the price and stock to number
        const parsedProduct = {
            ...product,
            stock: parseInt(product.stock, 10),
            price: parseFloat(product.price),
        };

        editProduct(productId, parsedProduct)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                fetchData();
                onClose();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    // handling input changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    return (
        <>
            <div className="w-[600px] h-90 p-5">
                <div>
                    <h1 className=" uppercase font-bold tracking-wide text-xl">
                        Edit product
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
                                value={product.name}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Description</div>
                        <div className="text-black">
                            <textarea
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="text"
                                placeholder="Description"
                                name="description"
                                rows={3}
                                value={product.description}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Price</div>
                        <div className="text-black">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="Number"
                                placeholder="Price"
                                name="price"
                                value={product.price}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Category</div>
                        <div className="text-black">
                            <select
                                name="category"
                                className=" w-full p-1 font-normal border-2 border-black"
                                value={product.category}
                                onChange={handleOnChange}
                            >
                                {category &&
                                    category.map((data) => (
                                        <option value={data._id} key={data._id}>
                                            {data.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-4/12">Stock</div>
                        <div className="text-black">
                            <input
                                className=" w-full p-1 font-normal border-2 border-black"
                                type="Number"
                                placeholder="Stock"
                                name="stock"
                                value={product.stock}
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
                            onClick={handleEditeProduct}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProductModal;
