
import {BrowserRouter, Route, Routes} from "react-router";

import BasePage from "./pages/base/Base";
import {ToastContainer} from "react-toastify";
import './App.css'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>    } index></Route>
                <Route element={<Register/>} path={"/register"}></Route>
                <Route element={<BasePage/>} path={"/private/:subpage/*"}></Route></Routes>
        </BrowserRouter>
        <ToastContainer/>

</>
  )
}

export default App
