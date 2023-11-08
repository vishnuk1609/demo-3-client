import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./Redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </UserContextProvider>
    </React.StrictMode>
);
