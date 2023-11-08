import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import productSaga from "./products/saga";
import { logger } from "redux-logger"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware,logger],
});
sagaMiddleware.run(productSaga);

export default store;
