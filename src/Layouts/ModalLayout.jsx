import { AiFillCloseSquare } from "react-icons/ai";

const ModalLayout = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
            onClick={handleClose}
            id="wrapper"
        >
            <div className=" flex flex-col bg-white rounded-md">
                <button
                    className="text-white text-2xl place-self-end"
                    onClick={() => onClose()}
                >
                    <AiFillCloseSquare color="black" size={30} />
                </button>
                <div className="bg-white p-2 rounded-lg">{children}</div>
            </div>
        </div>
    );
};

export default ModalLayout;
