import { combineReducers } from "@reduxjs/toolkit";
import { productData } from "./products/productReducer";

export default combineReducers({
    productData,
});
