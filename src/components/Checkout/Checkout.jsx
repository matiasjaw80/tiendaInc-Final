import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { addDoc, getDocs, collection, query, where, documentId, writeBatch } from 'firebase/firestore'
import { useNotification } from "../../notification/NotificationService"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const { cart, total, clearCart } = useCart()

    const { showNotification } = useNotification()

    const { register, handleSubmit } = useForm();

    const createOrder = async (userData) => {
        try {
            setLoading(true)
            const objOrder = {
                buyer: {
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                },
                items: cart,
                total
            }

            const batch = writeBatch(db)
            const outOfStock = []

            const ids = cart.map(prod => prod.id)

            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids))


            const { docs } = await getDocs(productsCollection)

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })


            if (outOfStock.length === 0) {
                batch.commit()

                const ordersCollection = collection(db, 'orders')

                const { id } = await addDoc(ordersCollection, objOrder)

                clearCart()
                setOrderId(id)
            } else {
                showNotification('error', 'ERROR! Hay productos que no tienen stock disponible')
            }
        } catch (error) {
            showNotification('error', 'ERROR! Hubo un error generando la orden: ' + error.message)
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return <h1>Se esta generando su orden...</h1>
    }

    if (orderId) {
        return (
            <div class='card'>
                <h1>Pronto recibira un email con el detalle de su orden</h1>
                <p>El id de su orden es: {orderId}</p>

                <h1>Muchas Gracias por su Compra!!!</h1>
                <Link class='btn' to='/'>Seguir Comprando</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Checkout</h1>
            <div class='card-checkout'>
                <div>
                    <form className="form">
                        <div>
                            <label htmlFor="name">Nombre completo: </label>
                            <input
                                id="name"
                                type="text"
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <label htmlFor="mail">Correo electrónico: </label>
                            <input
                                id="mail"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Teléfono móvil: </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="+54"
                                {...register("phone")}
                            />
                        </div>


                        <input class='btn' onClick={handleSubmit(createOrder)} type="submit" value='Generar Orden' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout