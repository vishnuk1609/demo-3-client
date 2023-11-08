import { useEffect, useState } from "react";
import { getAllCategory } from "../../Services/CategoryServices";
import { addNewProduct } from "../../Services/ProductServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { proudctList } from "../../Redux/products/actions";

const AddProductModal = ({ onClose }) => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
    });
    const dispatch = useDispatch();

    // for getting the category data
    useEffect(() => {
        getAllCategory()
            .then((res) => {
                setCategory(res.data.data);
            })
            .catch((error) => console.error(error));
    }, []);

    // for handling add product
    const hanldeAddProduct = () => {
        const parsedProduct = {
            ...product,
            stock: parseInt(product.stock, 10),
            price: parseInt(product.price, 10),
        };
        addNewProduct(parsedProduct)
            .then((res) => {
                toast.success(res.data.message);
                dispatch(proudctList())
                onClose();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    // for handling input changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    return (
        <>
            <div className="w-[600px] h-90 p-5 dark:bg-gray-950">
                <div>
                    <h1 className=" uppercase font-bold tracking-wide text-xl">
                        Add new product
                    </h1>
                </div>
                <div className=" space-y-3 mt-3 tracking-wider font-semibold text-gray-700  dark:text-white">
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
                                onChange={handleOnChange}
                                defaultValue={""}
                            >
                                <option disabled value={""}>
                                    Select category
                                </option>
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
                            onClick={hanldeAddProduct}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProductModal;
