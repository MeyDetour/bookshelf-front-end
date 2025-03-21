import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import './style.css'
import {Link} from "react-router-dom";

export default function Bookshelves(subpage) {
    const api = useApi();
    const toast = useToast();
    const [bookshelves, setBookshelves] = useState([]);
    console.log("bookshelves page");
    useEffect(() => {

        api("api/bookshelves", null, null, 'GET')
            .then((res) => {
                console.log(res)
                setBookshelves(res);
            })
            .catch((err) => {
                toast(" ", "Error while login :" + err.message);
            });
    }, [subpage])


    return (
        <>
            <h2>Bookshelves</h2>
            <div className={"bookshelvesContainer"}>
                {bookshelves && bookshelves.map((bookshelf, index) => (
                    <Link key={bookshelf._id} className={"oneBookshelf"} to={"/private/bookshelf/"+bookshelf._id}>
                        <img src={`/images/bookshelves/b${index % 9}.png`} alt=""/>

                        <div>
                            <span>{bookshelf.name}</span>
                            <div className={"bookCount"}>
                                <img style={{width: '20px'}} src="/icon/book.svg" alt=""/>
                                <span>{bookshelf.books.length}</span>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>


        </>
    )
}
