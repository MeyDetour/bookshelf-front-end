import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {useNavigate} from "react-router-dom";
import "./style.css"
import "../../../../history.js"

export default function Book({id,changePageData}) {
    const api = useApi();
    const toast = useToast();
    const [book, setBook] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        api("api/book/get/" + id, null, null, 'GET')
            .then((book) => {
                if (!book) {
                    return navigate("/private/bookshelves");
                }
                setBook(book);
            })
            .catch((err) => {
                toast(" ", "Error while get book :" + err.message);
            });

    }, [id]);

    return (
        <div className={"bookDetail"}>
            <div className={"bookHeader"}>
                <h1>{book.title} ({book.publishedYear})</h1>

                  <img onClick={()=>navigate("/private/edit/book/"+id)} src="/icon/pen.svg" alt=""/>

            </div>
            <div className={"bookContent"}>
                {book.image ? <img src={import.meta.VITE_BASE_URL + book.image} alt=""/> :
                    <img src="/images/bookCover.png" alt=""/>
                }

                <p>{book.description ? book.description : "No description for this book"}</p>
            </div>

        </div>
    )
}
