import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import './style.css'
import {useToast} from "../../hooks/useToast.jsx";
import useApi from "../../hooks/useApi.jsx";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        api("register", null, data, "post", false)
            .then((res) => {
                toast("OK", "Register Successfully. You can log in");
                navigate("/");
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);

            });
    }
    return (<>
            <div className="bookmark"></div>

            <form onSubmit={handleSubmit(onSubmit)} className={" plainForm"}>
                <h1>Let's register</h1>
                {errors.email && (
                    <span className={"error md-text"}>{errors.email.message}</span>
                )} {errors.username && (
                <span className={"error md-text"}>{errors.username.message}</span>
            )} {errors.password && (
                <span className={"error md-text"}>{errors.password.message}</span>
            )}

                <label>
                    <input
                        placeholder="Create username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                </label>

                <label>
                    <input
                        placeholder="Your email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                            required: "Email is required",
                        })}
                    />
                </label>

                {/* Champ requis avec validation */}
                <label>
                    <input
                        placeholder="Your password"
                        type="password"
                        {...register("password", {required: "This field is required"})}
                    />
                </label>


                {/* Bouton de soumission */}
                <button type="submit" className={"defaultButton"} value="Submit">Register</button>
                <Link to={"/"} className={"xsm-text"}>Login</Link>

            </form>
        </>
    )
}
