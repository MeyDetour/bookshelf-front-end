import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
import './style.css'
import {Link} from "react-router-dom";

export default function Dashboard(subpage) {
    const api = useApi();
    const toast = useToast();
    const [bookshelves, setBookshelves] = useState([]);

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
                        <img src={`/src/assets/images/bookshelves/b${index % 9}.png`} alt=""/>

                        <div>
                            <span>{bookshelf.name}</span>
                            <div className={"bookCount"}>
                                <img style={{width: '20px'}} src="/src/assets/icon/book.svg" alt=""/>
                                <span>{bookshelf.books.length}</span>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>


        </>
    )
}
