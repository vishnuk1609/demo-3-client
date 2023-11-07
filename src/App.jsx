import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import "./App.css";
import Router from "./Routes/Router";

function App() {
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path="/*" element={<Router />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
