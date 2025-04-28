import 'remixicon/fonts/remixicon.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import NotFound from './components/Admin/NotFound'
import Product from "./components/Admin/Product/Product"
import Payment from "./components/Admin/Payment"
import Setting from './components/Admin/Settings'
import Orders from './components/Admin/Orders'
import Dashboard from './components/Admin/Dashboard'
import Homepage from './components/Frontend/Homepage'
import Login from './components/Frontend/Auth/Login'
import Signup from './components/Frontend/Auth/Signup'
import Cart from './components/Frontend/Cart'
import PreGuard from './components/Guard/PreGuard'
import Profile from './components/Frontend/Profile'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin'>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Product />} />
          <Route path='orders' element={<Orders />} />
          <Route path='payments' element={<Payment />} />
          <Route path='settings' element={<Setting />} />
        </Route>
        <Route path='/' element={<Homepage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route element={<PreGuard />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App