import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {useEffect, useState} from "react";
import "./style.css"
import PropTypes from 'prop-types';
import OneBook from "../../../../components/oneBook/oneBook.jsx";  // Importer PropTypes
export default function Bookshelf({id}) {
    console.log("bookshelf page of ", id);
    const api = useApi();
    const toast = useToast();
    const [bookshelf, setBookshelf] = useState(null);

    useEffect(() => {
        api("api/bookshelf/get/" + id, null, null, 'GET')
            .then((res) => {

                setBookshelf(res);
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);
            });
    }, [id])

    if (!bookshelf) {
        return <span>No bookokshelf</span>
    }
    console.log(bookshelf);

    return (
        <>{ bookshelf.books.length > 0 ?
            <>    <h1>Bookshelf : {bookshelf.name}</h1>
                <div className="booksContainer">
                    {bookshelf.books && bookshelf.books.map((book,index) => (
                        <OneBook key={index} book={book}></OneBook>
                    ))}
                </div>
            </>

        : <span>No book here</span>}
        </>
    )
}
Bookshelf.propTypes = {
    id: PropTypes.string.isRequired,  // valider que 'id' est une chaîne et est requise
};
