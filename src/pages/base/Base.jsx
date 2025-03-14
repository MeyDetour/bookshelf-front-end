import {useParams} from "react-router";
import Navbar from "../../components/navbar/Navbar.jsx";
import Profile from "./subpages/profile/Profile.jsx";
import Book from "./subpages/book/Book.jsx";
import "./style.css"
import Bookshelves from "./subpages/bookshelves/Bookshelves.jsx";
import New from "./subpages/new/new.jsx";
import Bookshelf from "./subpages/bookshelf/Bookshelf.jsx";
import BooksOfBookshelves from "./subpages/BooksOfBookshelves/BooksOfBookshelves.jsx";
import {Link} from "react-router-dom";

export default function BasePage() {
    const {subpage, '*': wildcard} = useParams();
    console.log(subpage,wildcard)
    return (
        <>
            <div className={"basePage"}>

                <div className={"content"}>


                    { (subpage === "bookshelves"  || subpage === "bookshelf" )&&
                        <>
                            <div className={"header simpleForm"}>
                                <input type="search"/>
                                <button className={"defaultButton"}>Search</button>
                                <Link to={"/private/plus"} className={"button1"}>Add</Link>
                            </div>
                            <Bookshelves></Bookshelves>
                        </>
                    }
                     {subpage === 'book' && <BooksOfBookshelves bookId={wildcard}></BooksOfBookshelves>}
                    {subpage === 'plus' && <New/>}
                    {subpage === 'profile' && <Profile/>}
                    {subpage === 'bookshelf' && wildcard && <><hr/><Bookshelf id={wildcard}> </Bookshelf></> }
                    {subpage === 'book' && wildcard && <Book id={wildcard}> </Book>}


                </div>
            </div>
        </>
    )
}
