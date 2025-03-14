import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import './style.css'
import {useState} from "react";

export default function New() {
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [type, setType] = useState("bookshelf")
    const [bookImage, setBookImage] = useState(null)
    const [bookPdf, setBookPdf] = useState(null)
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmiData = (data) => {
        console.log("submitted")
        if (type === "book") {
            createBook(data)
            return
        }
        createBookshelf(data)
    };

    function createBookshelf(data) {
        console.log("submit", data);
        console.log(data)
        if (!data) {
            setError("No data send")
            return
        }
        if (!data.name ||data.name ==="") {
            setError("Please enter title")
            return;
        }
        api("api/bookshelf/new", null, data, "POST")
            .then((res) => {
                console.log(res)
                navigate("/private/dashboard");
            })
            .catch((err) => {
                setError(err)
                toast(" ", "Error while create bookshelf :" + err.message);
            });
    };

    function createBook(data) {

        console.log("submit", data);
        console.log(data)
        if (!data) {
            setError("No data send")
        }
        if (!data.title || data.title ==="") {
            setError("Please enter a title")
        }
        if (!data.publishedYear || data.publishedYear ==="") {
            setError("Please enter a title")
        }
        api("api/book/new", null, data, "POST")
            .then((res) => {
                console.log(res)
                navigate("/private/book/" + res.id);
            })
            .catch((err) => {
                setError(err)
                toast(" ", "Error while create bookshelf :" + err.message);
            });
    };

    return (
        <>
            <div className={"headerOfForm"}>
                <span onClick={() => setType("bookshelf")}
                      className={type === "bookshelf" ? "focus" : ""}>Bookshelf</span>
                <span onClick={() => setType("book")} className={type === "book" ? "focus" : ""}>Book</span>
            </div>
            <hr/>
            {type === "bookshelf" ?
                <form onSubmit={handleSubmit(onSubmiData)} className={"simpleForm"}>
                    <h2>New bookshelf </h2>
                    {error && (
                        <span className={"error md-text"}>{error}</span>
                    )}

                    <label>
                        <input
                            placeholder="Booskhelf name"
                            {...register("name", {})}
                        />
                    </label>


                    {/* Bouton de soumission */}
                    <button type="submit" className={"defaultButton"} value="Submit">Create</button>

                </form>
                : <form onSubmit={handleSubmit(onSubmiData)} className={"simpleForm"}>
                    <h2>New book</h2>
                    {error && (
                        <span className={"error md-text"}>{error}</span>
                    )}

                    <label>
                        <input
                            placeholder="Book title"
                            {...register("title", {})}
                        />
                    </label>
                    <label>
                    <input

                        placeholder="Book INE"
                        {...register("ine", {})}
                    />
                </label>
                    <label>
                        <input
                            type="date"
                            placeholder="Book published Year"
                            {...register("publishedYear", {})}
                        />
                    </label>

                    <textarea   placeholder={"Book description"}    {...register("description", {})} />

                    <label>
                        <input type="file" accept="image/*" onChange={(e) => setBookImage(e.target.files[0])} />
                    </label>
                    <label>
                        <input type="file" accept=".pdf" onChange={(e) => setBookPdf(e.target.files[0])} />
                    </label>

                    {/* Bouton de soumission */}
                    <button type="submit" className={"defaultButton"} value="Submit">Create</button>

                </form>

            }


        </>


    )
}
