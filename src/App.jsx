
import {BrowserRouter, Route, Routes} from "react-router";

import history from './history';
import BasePage from "./pages/base/Base";
import {ToastContainer} from "react-toastify";
import './App.css'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Profile from "./pages/base/subpages/profile/Profile.jsx";
import Edit from "./pages/edit/edit.jsx";
import New from "./pages/new/new.jsx";
import {useState} from "react";

function App() {
    const [subpage, setSubpage] = useState(null);
    const [id, setId] = useState(null);

    console.log("bookshelves page");


    function changePageData(subpage,id) {
        if (subpage) setSubpage(subpage);
        if (id) setId(id);

    }

  return (
    <>
        <BrowserRouter history={history}>
            <Routes>

                <Route element={<Login/>    } index></Route>
                <Route element={<Register/>} path={"/register"}></Route>
                <Route element={<Edit changePageData={changePageData}/>} path={"/private/edit/:type/:id"}></Route>
                <Route element={<New changePageData={changePageData}/>} path={"/private/add"}></Route>
                <Route element={<Profile/>} path={"/private/profile"}></Route>

                <Route element={<BasePage subpage={subpage} id={id} changePageData={changePageData}/>} path={"/private/bookshelves"}></Route>
                 </Routes>
        </BrowserRouter>
        <ToastContainer/>

</>
  )
}

export default App
