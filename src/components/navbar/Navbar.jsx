import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import "./style.css"

export default function Navbar() {


    const [redirectRoute, setRedirectRoute] = useState(null);
    const deconnexion = function () {
        sessionStorage.setItem("token", " ")
        setRedirectRoute("/login")
    }
    if (redirectRoute) {
        return <Navigate to={redirectRoute}/>;
    }
    return (
        <div className={"navbar"}>
            <ul>
                <li>
                    <Link to={"/private/plus"}><img src="/src/assets/icon/plus.svg" alt=""/></Link>
                </li>
                <li>
                    <Link to={"/private/dashboard"}><img src="/src/assets/icon/bookshelf.svg" alt=""/></Link>
                </li>
                <li>
                    <Link to={"/private/profile"}><img src="/src/assets/icon/profile.svg" alt=""/></Link>
                </li>
            </ul>
        </div>
    )
}
