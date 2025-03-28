import {Link} from "react-router-dom";
import "./style.css"
import {useParams} from "react-router";

export default function OneBook({book}) {
    console.log("the book:",book);
    return (
        <Link to={'/private/book/' + book._id} className={"oneBook"}>
            {book.image ? <img src={import.meta.VITE_BASE_URL + book.image} alt=""/> :
                <img src="/images/bookCover.png" alt=""/>
            }
            <div>
                <span>{book.title}</span>
                <p>{book.description ?book.description  : "No description for this book" }</p>

            </div>

        </Link>
    )

}
