import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main';
import Order from './components/order/Order';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/orders' element={<Order />}/>
      </Routes>
      {/* <Main /> */}
    </BrowserRouter>
  )
}

export default App
