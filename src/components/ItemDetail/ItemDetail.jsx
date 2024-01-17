import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useNotification } from '../../notification/NotificationService'

const InputCount = ({ onAdd, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial)

    const handleChange = (e) => {
        if (e.target.value <= stock) {
            setCount(e.target.value)
        }
    }

    return (
        <div>
            <input type='number' onChange={handleChange} value={count} />
            <button onClick={() => onAdd(count)}>Agregar al carrito</button>
        </div>
    )
}

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial)

    const increment = () => {
        if (count < stock) {
            setCount(count + 1)
        }

    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div>
            <p>{count}</p>
            <button class='btn' onClick={decrement}>-</button>
            <button class='btn' onClick={() => onAdd(count)}>Agregar al carrito</button>
            <button class='btn' onClick={increment}>+</button>
        </div>
    )
}


const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const [inputType, setInputType] = useState('button')
    const { addItem, isInCart } = useCart()
    const { showNotification } = useNotification()
    const ItemCount = inputType === 'input' ? InputCount : ButtonCount

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        addItem(objProductToAdd)
        showNotification('success', `Se agrego correctamente ${quantity} ${name}`)
    }

    return (
        <div class='card-detail'>
            <>
                <div>
                    <img class='img' src={img} />
                </div>
                <div>
                    <h1>{name}</h1>
                    <p>Categoria: {category}</p>
                    <p>Descripción: {description}</p>
                    <h3>Precio: {price}</h3>
                    {
                        !isInCart(id) ? (
                            <ItemCount onAdd={handleOnAdd} stock={stock} />
                        ) : (
                            <Link class='btn' to='/cart'>Finalizar compra</Link>
                        )
                    }
                    <p>Stock Disponible: {stock} </p>
                </div>

            </>
        </div>
    )
}

export default ItemDetail