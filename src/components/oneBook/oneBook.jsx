
import "./style.css"

export default function OneBook({book,changePageData}) {
    return (
        <div onClick={()=> changePageData("book",book._id)  } className={"oneBook"}>
            {book.image ? <img src={import.meta.VITE_BASE_URL + book.image} alt=""/> :
                <img src="/images/bookCover.png" alt=""/>
            }
            <div>
                <span>{book.title}</span>
                <p>{book.description ?book.description  : "No description for this book" }</p>

            </div>

        </div>
    )

}
