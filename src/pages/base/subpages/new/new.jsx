import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import './style.css'
import {useEffect, useState} from "react";

export default function New() {
    const api = useApi();
    const toast = useToast();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [type, setType] = useState("bookshelf")
    const [bookImage, setBookImage] = useState(null)
    const [bookPdf, setBookPdf] = useState(null)
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelves, setSelectedBookshelves] = useState([]);
    const {
        register,
        handleSubmit,
    } = useForm();

    console.log("plus page");
    useEffect(() => {

        api("api/bookshelves", null, null, 'GET')
            .then((res) => {
                console.log(res)
                setBookshelves(res);
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);
            });
    }, [])


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
        if (!data.name || data.name === "") {
            setError("Please enter title")
            return;
        }
        api("api/bookshelf/new", null, data, "POST")
            .then((res) => {
                console.log(res)
                navigate("/private/bookshelves");
            })
            .catch((err) => {
                setError(err)
                toast(" ", "Error while create bookshelf :" + err.message);
            });
    };

    async function createBook(data) {

        console.log("submit", data);
        console.log(data)
        if (!data) {
            setError("No data send")
            return
        }
        if (!data.title || data.title === "") {
            setError("Please enter a title")
            return
        }

        if (!data.publishedYear || data.publishedYear === "") {
            setError("Please enter a published year")
            return
        }
        if (data.publishedYear > new Date().getFullYear()) {
            setError("Please enter a valid published year")
            return
        }
        console.log( Array.isArray(selectedBookshelves))
     //   data.bookshelves =  Array.isArray(selectedBookshelves) ? selectedBookshelves  : [selectedBookshelves];

        console.log(data)
            const res = await api("api/book/new", null, data, "POST")

            console.log(res)
            if (res.error) {
                setError(res.error)
            }
            if (res && res.id) {
                navigate("/private/book/" + res.id);
            }


    };


    return (
        <>
            <div className={"headerOfForm"}>
                <span onClick={() => {
                    setType("bookshelf")
                    setError("")
                }}
                      className={type === "bookshelf" ? "focus" : ""}>Bookshelf</span>
                <span onClick={() => {
                    setType("book")
                    setError("")
                }} className={type === "book" ? "focus" : ""}>Book</span>
                <Link to={"/private/bookshelves"}>X</Link>
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
                :


                <form onSubmit={handleSubmit(onSubmiData)} className={"simpleForm"}>
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
                            type="number"
                            placeholder="Book published Year"
                            {...register("publishedYear", {})}
                        />
                    </label>

                    <textarea placeholder={"Book description"}    {...register("description", {})} />

                    <label>
                        Cover image
                        <input type="file" accept="image/*" onChange={(e) => setBookImage(e.target.files[0])}/>
                    </label>
                    <label>
                        Pdf book
                        <input type="file" accept=".pdf" onChange={(e) => setBookPdf(e.target.files[0])}/>
                    </label>
                    {bookshelves && (
                        <>
                            <legend>Choose your corresponding's bookshelves:</legend>
                            {bookshelves.map((bookshelf) => (
                                <div key={bookshelf._id} className="form-check">
                                    <input
                                        value={bookshelf._id}
                                        type="checkbox"
                                        id={bookshelf._id}
                                        {...register("bookshelves", {required: false})}

                                    />
                                    <label htmlFor={bookshelf._id}>{bookshelf.name}</label>
                                </div>
                            ))}
                        </>


                    )}


                    {/* Bouton de soumission */}
                    <button type="submit" className={"defaultButton"} value="Submit">Create</button>

                </form>

            }


        </>


    )
}
