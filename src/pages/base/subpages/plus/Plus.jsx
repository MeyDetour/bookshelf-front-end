import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import './style.css'

export default function Plus() {
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        api("api/bookshelf/new", null, data, "post")
            .then((res) => {
                console.log(res)
                navigate("/private/dashboard");
            })
            .catch((err) => {
                toast(" ", "Error while create bookshelf :" + err.message);
            });
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className={"simpleForm"}>
            <h1>New bookshelf </h1>
            {errors.name && (
                <span className={"error md-text"}>{errors.email.message}</span>
            )}

            <label>
                <input
                    placeholder="Booskhelf name"
                    {...register("name", {required: true})}
                />
            </label>


            {/* Bouton de soumission */}
            <button type="submit" className={"defaultButton"} value="Submit">Create</button>

        </form>

    )
}
