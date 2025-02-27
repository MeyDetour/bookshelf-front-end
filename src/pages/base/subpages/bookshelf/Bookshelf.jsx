import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';  // Importer PropTypes
export default function Bookshelf({id}) {
    const api = useApi();
    const toast = useToast();
    const [bookshelf, setBookshelf] = useState({});

    useEffect(() => {
        api("api/bookshelf/get/" + id, null, null, 'GET')
            .then((res) => {
                res.books = [
                    {
                        _id: 0,
                        title: "Bookshelf",
                    }
                ]

                console.log(res)
                setBookshelf(res);
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);
            });
    }, [])


    return (
        <>{bookshelf.name &&
            <div>
                <h1>{bookshelf.name}</h1>
                <div className="booksContainer">
                    {bookshelf.books && bookshelf.books.map((book) => (
                        <div key={book._id} className={"oneBook"}>
                            {book.image ? <img src={import.meta.VITE_BASE_URL + book.image} alt=""/> :
                                <img src="/src/assets/images/bookCover.png" alt=""/>}  
                            <span>{book.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    )
}
Bookshelf.propTypes = {
    id: PropTypes.string.isRequired,  // valider que 'id' est une chaîne et est requise
};
