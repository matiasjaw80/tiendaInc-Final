import cart from '../../assets/cart.svg'
import { CartContext, useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartWidget = () => {

    const { totalQuantity } = useCart()
    const Navigate = useNavigate()


    return (
        <button class='btn-cart' onClick={() => Navigate('/cart')}><img src={cart}/>{ totalQuantity }</button>
    )
}

export default CartWidget