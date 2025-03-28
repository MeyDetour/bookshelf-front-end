import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import './style.css'
import OneBook from "../../../../components/oneBook/oneBook.jsx";

// eslint-disable-next-line react/prop-types
export default function BooksOfBookshelves({bookId,changePageData}) {
    const api = useApi();
    const toast = useToast();
    const [bookshelves, setBookshelves] = useState([]);

    useEffect( () => {
        try {
            const book =  api("api/book/get/" + bookId, null, null, 'GET')

            if (book && book.bookshelves) {
                let bookshelvesData = []
                for (let bookshelfData of book.bookshelves) {
                    const bookshelf =  api("api/bookshelf/get/" + bookshelfData._id, null, null, 'GET')
                    try {
                        if (bookshelf) {
                            bookshelvesData.push(bookshelf);
                        }
                    } catch (err) {
                        toast(" ", "Error while get bookshelf data :" + err.message);
                    }
                }
                setBookshelves(bookshelvesData);
            }

        } catch (err) {
            toast(" ", "Error while get book :" + err.message);
        }

    }, [bookId])

    if (!bookshelves || bookshelves.length === 0) return null;

    return (
        <>
            {bookshelves.map(bookshelf => (
                <>
                    <h2>Books Of bookshelf : {bookshelf.name}</h2>
                        {bookshelf.books && bookshelf.books.map((book, index) => (
                            <OneBook changePageData={changePageData} key={index} book={book}></OneBook>
                        ))}
                </>

            ))}

        </>
    )
}
