import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {useEffect, useState} from "react";
import "./style.css"
import PropTypes from 'prop-types';
import OneBook from "../../../../components/oneBook/oneBook.jsx";
import {useNavigate} from "react-router-dom";  // Importer PropTypes
export default function Bookshelf({id,changePageData }) {
    console.log("bookshelf page of ", id);
    const api = useApi();
    const toast = useToast();
    const [bookshelf, setBookshelf] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        try{
            api("api/bookshelf/get/" + id, null, null, 'GET')
                .then((res) => {

                    setBookshelf(res);
                })
                .catch((err) => {
                    toast(" ", "Error while login :" + err.message);
                });
        }
        catch(err) {
            changePageData("bookshelves",null)
        }

    }, [id])


    if (!bookshelf) {
        return <span>Loading</span>
    }

    return (

        <>
            <div className={"bookshelfHeader"}>
                <h1>{bookshelf.name} </h1>

                <div>
                    <img onClick={() => navigate("/private/edit/bookshelf/" + id)} src="/icon/pen.svg" alt=""/>
                  </div>
            </div>
            {bookshelf.books.length > 0 ?
                <div className="booksContainer">
                    {bookshelf.books && bookshelf.books.map((book, index) => (
                        <OneBook changePageData={changePageData} key={index} book={book}></OneBook>
                    ))}
                </div>
                : <span>No book here</span>}


        </>
    )
}
Bookshelf.propTypes = {
    id: PropTypes.string.isRequired,  // valider que 'id' est une chaîne et est requise
};
