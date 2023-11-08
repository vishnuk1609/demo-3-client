import { takeEvery, put } from "redux-saga/effects";
import { getAllProducts } from "../../Services/ProductServices";
import {
    GET_ALL_PRODUCTS,
    SET_PRODUCTS,
    SET_PRODUCTS_FETCH_ERROR,
} from "../../constants/constants";

function* getProudcts() {
    try {
        const data = yield getAllProducts();
        yield put({ type: SET_PRODUCTS, data: data.data.data });
    } catch (error) {
        yield put({
            type: SET_PRODUCTS_FETCH_ERROR,
            error: error.response.data.message,
        });
    }
}

function* productSaga() {
    yield takeEvery(GET_ALL_PRODUCTS, getProudcts);
}

export default productSaga;
