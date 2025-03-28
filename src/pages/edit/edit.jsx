import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import './style.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import useApi from "../../hooks/useApi.jsx";
import {useToast} from "../../hooks/useToast.jsx";

export default function Edit({changePageData}) {
    const api = useApi();
    const {id, type} = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [data, setData] = useState(null)
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

        async function getData() {

            const bookshelves = await api("api/bookshelves", null, null, 'GET')

            console.log(bookshelves)
            setBookshelves(bookshelves);


            try {
                const res = await api("api/" + type + "/get/" + id, null, null, 'GET')
                setData(res);
            } catch (err) {
                toast(" ", "Error while try to editing :" + err.message);
            }

        }


        if (type === "book" || type === "bookshelf" && !data) {
            getData()
        }

    }, [])


    const onSubmiData = (dataSend) => {
        console.log("submitted")
        if (type === "book") {
            editBook(dataSend)
            return
        }
        editBookshelf(dataSend)
    };

    function editBookshelf(dataSend) {
        console.log("submit", dataSend);
        console.log(dataSend)
        if (!dataSend) {
            setError("No dataSend send")
            return
        }
        if (!dataSend.name || dataSend.name === "") {
            setError("Please enter title")
            return;
        }
        api("api/bookshelf/edit/" + id, null, dataSend, "PUT")
            .then((res) => {
                console.log(res)
                if (res.ok) {

                    changePageData("bookshelves", null)
                    return navigate("/private/bookshelves");
                }
            })
            .catch((err) => {
                setError(err)
                toast(" ", "Error while editing bookshelf :" + err.message);
            });
    }

    if (!data) {
        return
    }

    async function editBook(data) {

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
        console.log(Array.isArray(selectedBookshelves))
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
    const remove = () => {
        api("api/" + type + "/remove/" + id, null, null, 'DELETE')
            .then((res) => {
                if (res.message === "ok") {
                    toast("OK", type + " removed successfully");
                    changePageData("bookshelves", null)
                    navigate("/private/bookshelves");
                }


            })
            .catch((err) => {
                toast(" ", "Error while remove" + type + " :" + err.message);
            });
    }


    return (
        <>
            <div className={"basePage"}>

                {type === "bookshelf" ?
                    <form onSubmit={handleSubmit(onSubmiData)} className={"simpleForm"}>
                        <div className={"editFormHeader"}>
                            <h2>Edit bookshelf </h2>
                            <img onClick={() => remove()} src="/icon/bin.svg" alt=""/>
                            <Link to={"/private/bookshelves"}>X</Link>
                        </div>
                        {error && (
                            <span className={"error md-text"}>{error}</span>
                        )}

                        <label>
                            <input
                                defaultValue={data.name}
                                placeholder="Booskhelf name"
                                {...register("name", {})}
                            />
                        </label>


                        {/* Bouton de soumission */}
                        <button type="submit" className={"defaultButton"} value="Submit">Edit</button>

                    </form>
                    :


                    <form onSubmit={handleSubmit(onSubmiData)} className={"simpleForm"}>

                        <div className={"editFormHeader"}>
                            <h2>Edit book </h2>
                            <img onClick={() => remove()} src="/icon/bin.svg" alt=""/>
                            <Link to={"/private/bookshelves"}>X</Link>
                        </div>
                        {error && (
                            <span className={"error md-text"}>{error}</span>
                        )}


                        <label>
                            <input
                                defaultValue={data.title}
                                placeholder="Book title"
                                {...register("title", {})}
                            />
                        </label>
                        <label>
                            <input

                                defaultValue={data.ine}
                                placeholder="Book INE"
                                {...register("ine", {})}
                            />
                        </label>
                        <label>
                            <input

                                defaultValue={data.publishedYear}
                                type="number"
                                placeholder="Book published Year"
                                {...register("publishedYear", {})}
                            />
                        </label>

                        <textarea placeholder={"Book description"}    {...register("description", {})} />

                        {/*{book.image &&  <img src={import.meta.env.VITE_BASE_URL+book.image} alt=""/>}*/}
                        {/*<label>*/}
                        {/*    Cover image*/}
                        {/*    <input type="file" accept="image/*" onChange={(e) => setBookImage(e.target.files[0])}/>*/}
                        {/*</label>*/}
                        {/*<label>*/}
                        {/*    Pdf book*/}
                        {/*    <input type="file" accept=".pdf" onChange={(e) => setBookPdf(e.target.files[0])}/>*/}
                        {/*</label>*/}
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
                        <button type="submit" className={"defaultButton"} value="Submit">Edit</button>

                    </form>

                }

            </div>
        </>


    )
}
