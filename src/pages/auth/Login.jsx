import {useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useToast} from "../../hooks/useToast.jsx";
import useApi from "../../hooks/useApi.jsx";

import './style.css'
export default function Login() {
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        api("login", null, data, "post", false)
            .then((res) => {
                toast("OK", "Login Successfully");
                sessionStorage.setItem("token", res.token);
                navigate("/private/bookshelves");
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);
            });
    };

    return (
        <>
            <div className="bookmark"></div>
            <form onSubmit={handleSubmit(onSubmit)} className={" plainForm"}>
            <h1>Let's log in !</h1>
            {errors.email && (
                <span className={"error md-text"}>{errors.email.message}</span>
            )} {errors.password && (
            <span className={"error md-text"}>{errors.password.message}</span>
        )}

            <label>
                <input
                    placeholder="Your email"
                    defaultValue='mey@mey.com'
                    {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })}
                />
            </label>

            {/* Champ requis avec validation */}
            <label>
                <input
                    placeholder="Your password"
                    defaultValue={"meymey"}
                    type="password"
                    {...register("password", {required: "This field is required"})}
                />
            </label>


            {/* Bouton de soumission */}
            <button  type="submit" className={"defaultButton"} value="Submit">Login</button>
            <Link to={"/register"} className={"xsm-text"}>Register</Link>

        </form>

        </>

    )
}
