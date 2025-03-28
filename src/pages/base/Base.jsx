
import Book from "./subpages/book/Book.jsx";
import "./style.css"
import Bookshelves from "./subpages/bookshelves/Bookshelves.jsx";
import Bookshelf from "./subpages/bookshelf/Bookshelf.jsx";
import BooksOfBookshelves from "./subpages/BooksOfBookshelves/BooksOfBookshelves.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import "../../history.js"

export default function BasePage({subpage,id,changePageData}) {


    return (
        <>
            <div className={"basePage"}>


                <div className={"header simpleForm"}>
                    <input type="search"/>
                    <button className={"defaultButton"}>Search</button>
                    <Link to={"/private/add"} className={"button1"}>Add</Link>
                </div>
                <Bookshelves changePageData={changePageData}></Bookshelves>

                <hr/>
                {subpage === 'book' && <BooksOfBookshelves changePageData={changePageData} bookId={id}></BooksOfBookshelves>}

                {subpage === 'bookshelf' && id && <><Bookshelf changePageData={changePageData}
                    id={id}> </Bookshelf></>}
                {subpage === 'book' && id && <Book  id={id}> </Book>}


            </div>
        </>
    )
}
