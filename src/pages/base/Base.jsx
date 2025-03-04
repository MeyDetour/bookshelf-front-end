import {useParams} from "react-router";
import Navbar from "../../components/navbar/Navbar.jsx";
import Profile from "./subpages/profile/Profile.jsx";
import Book from "./subpages/book/Book.jsx";
import "./style.css"
import Dashboard from "./subpages/dashboard/dashboard.jsx";
import Plus from "./subpages/plus/Plus.jsx";
import Bookshelf from "./subpages/bookshelf/Bookshelf.jsx";
import BooksOfBookshelves from "./subpages/BooksOfBookshelves/BooksOfBookshelves.jsx";

export default function BasePage() {
    const {subpage, '*': wildcard} = useParams();
    console.log(wildcard)
    return (
        <>
            <div className={"basePage"}>
                <Navbar></Navbar>
                <div className={"content"}>

                    <div className={"left"}>
                        <div className={"header simpleForm"}>
                            <input type="search"/>
                            <button className={"defaultButton"}>Search</button>
                        </div>
                        {subpage === "book" ?
                            <BooksOfBookshelves bookId={wildcard}></BooksOfBookshelves>
                            : <Dashboard subpage={subpage}></Dashboard>
                        }


                    </div>
                    {subpage !== "dashboard" && <div className="right">
                        {subpage === 'plus' && <Plus/>}
                        {subpage === 'profile' && <Profile/>}
                        {subpage === 'bookshelf' && wildcard && <Bookshelf id={wildcard}> </Bookshelf>}
                        {subpage === 'book' && wildcard && <Book id={wildcard}> </Book>}
                    </div>
                    }

                </div>
            </div>
        </>
    )
}
