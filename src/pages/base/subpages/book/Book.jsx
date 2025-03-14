import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import OneBook from "../../../../components/oneBook/oneBook.jsx";
import {useNavigate} from "react-router-dom";

export default function Book({id}) {
    const api = useApi();
    const toast = useToast();
    const [book,setBook] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        api("api/book/get/" + id, null, null, 'GET')
            .then((book) => {
                if(!book){
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
            <h1>{book.title}</h1>

        </div>
    )
}
