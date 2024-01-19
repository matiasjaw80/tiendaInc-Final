import './App.css'

import Navbar from './components/Navbar/Navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import CartView from './components/CartView/CartView'
import Checkout from './components/Checkout/Checkout'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './notification/NotificationService'

const App = () => {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <CartProvider>
            <NavBar />
            <main>
              <Routes>
                <Route path='/' element={<ItemListContainer greeting={'Todas las Categorias'} />} />
                <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Categoria'} />} />
                <Route path='/detail/:productId' element={<ItemDetailContainer />} />
                <Route path='/cart' element={<CartView />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='*' element={<h1>404 Not Found</h1>} />
              </Routes>
            </main>
          </CartProvider>
        </BrowserRouter>
      </NotificationProvider>
    </>
  )
}

export default App