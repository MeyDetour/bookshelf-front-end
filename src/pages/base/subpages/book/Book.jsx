import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import OneBook from "../../../../components/oneBook/oneBook.jsx";

export default function Book({id}) {
    const api = useApi();
    const toast = useToast();
    const [book,setBook] = useState({});
    useEffect(() => {
        api("api/book/get/" + id, null, null, 'GET')
            .then((book) => {

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
