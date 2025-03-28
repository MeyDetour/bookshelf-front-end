import './style.css'
import {Link} from "react-router-dom";
import '../../../../history.js'
import {useEffect, useState} from "react";
import useApi from "../../../../hooks/useApi.jsx";
import {useToast} from "../../../../hooks/useToast.jsx";
export default function Bookshelves({changePageData}) {
    const [bookshelves, setBookshelves] = useState([]);
    const api = useApi();
    const toast = useToast();


    useEffect(() => {
        const loadBookshelves = async () => {
            api("api/bookshelves", null, null, 'GET')
                .then((res) => {
                    setBookshelves(res);
                })
                .catch((err) => {
                    toast(" ", "Error while login :" + err.message);
                });
        }
        loadBookshelves()
    }, []);



    return (
        <>
            <h2>Bookshelves</h2>
            <div className={"bookshelvesContainer"}>
                {bookshelves && bookshelves.map((bookshelf, index) => (
                    <div key={bookshelf._id} className={"oneBookshelf"} onClick={()=>changePageData("bookshelf",bookshelf._id)} to={"/private/bookshelf/"+bookshelf._id}>
                        <img src={`/images/bookshelves/b${index % 9}.png`} alt=""/>

                        <div>
                            <span>{bookshelf.name}</span>
                            <div className={"bookCount"}>
                                <img style={{width: '20px'}} src="/icon/book.svg" alt=""/>
                                <span>{bookshelf.books.length}</span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}
