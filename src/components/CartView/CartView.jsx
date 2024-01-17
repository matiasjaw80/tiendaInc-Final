import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { useNotification } from '../../notification/NotificationService'
import { useNavigate } from "react-router-dom"

const CartView = () => {
    const { cart, total, removeItem, clearCart } = useCart()

    const Navigate = useNavigate()

    return (
        <div class='container-cart'>

            <h1>Carrito</h1>

            <div class='cart'>
                <table>
                    <tr>
                        <th>Codigo</th>
                        <th>Cantidad</th>
                        <th>Precio unidad</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        cart.map(prod => {
                            return (
                                <tr key={prod.id}>
                                    <th>{prod.name}</th>
                                    <th>{prod.quantity}</th>
                                    <th>${prod.price}</th>
                                    <th>${prod.quantity * prod.price}</th>
                                    <button class='btn' onClick={() => Navigate(`/detail/${prod.id}`)}>Detalle</button>
                                    <button class='btn-delete' onClick={() => removeItem(prod.id)}>Eliminar</button>
                                </tr>
                            )
                        })
                    }
                </table>

            </div>
            <div class='cart'>
                <table>
                    <tr>
                        <th>
                            <h1>Total de la compra: </h1>
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                        <th>
                            <h1> $ {total}</h1>
                        </th>
                        <th>
                            <button class='btn-ok' onClick={() => Navigate('/checkout')}>CONFIRMAR</button>
                            <button class='btn-delete' onClick={() => clearCart()}>Vaciar Carrito</button>
                        </th>

                    </tr>
                </table>
            </div>
        </div >
    )
}

export default CartView