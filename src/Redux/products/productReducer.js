import {
    GET_ALL_PRODUCTS,
    SET_PRODUCTS,
    SET_PRODUCTS_FETCH_ERROR,
} from "../../constants/constants";

export const productData = (
    state = { data: [], isLoading: false, error: false },
    action
) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return { ...state, isLoading: true };
        case SET_PRODUCTS:
            return { ...state, isLoading: false, data: action.data };
        case SET_PRODUCTS_FETCH_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};
// redux - saga
// dark mode | light mode switching  
// 
