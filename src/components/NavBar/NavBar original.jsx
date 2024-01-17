import logo from '../../assets/logo.svg'
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const Navigate = useNavigate()

    return (
        <header>
            <nav>
                <img src={logo} class='logo' onClick={() => Navigate('/')}/>
                <section>
                    <Link class='btn' to='/'>Todas</Link>
                    <Link class='btn' to='/category/abrigos'>Abrigos</Link>
                    <Link class='btn' to='/category/remeras'>Remeras</Link>
                    <Link class='btn' to='/category/pantalones'>Pantalones</Link>                  
                </section>
                <CartWidget />
            </nav>
        </header>
    )
}

export default NavBar