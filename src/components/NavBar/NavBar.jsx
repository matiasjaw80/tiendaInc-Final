import logo from '../../assets/logo.svg'
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom'

import { useEffect, useState } from "react";
import { db } from "../../services/firebase/firebaseConfig"
import { getDocs, collection, query, orderBy } from "firebase/firestore";


const NavBar = () => {
    const [categories, setCategories] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const categoriesCollection = query(
            collection(db, "categories"),
            orderBy("name", "desc")
        );

        getDocs(categoriesCollection).then((querySnapshot) => {
            console.log(querySnapshot);
            const categoriesAdapted = querySnapshot.docs.map((doc) => {
                const fields = doc.data();
                return { id: doc.id, ...fields };
            });

            setCategories(categoriesAdapted);
        });
    }, []);


    return (
        <header>
            <nav>
                <img src={logo} class='logo' onClick={() => Navigate('/')} />

                <section>
                    <Link class='btn' to='/'>Todas</Link>
                    {categories.map((cat) => {
                        return (
                            <Link class='btn'
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                            >
                                {cat.name}
                            </Link>
                        );
                    })}
                </section>

                <CartWidget />
            </nav>
        </header>
    )
}

export default NavBar