import './App.css'
import GooodsInfo from './components/goodsInfo/GoodsInfo';
import Header from './components/header/Header'
import Main from './components/main/Main';
import OrderList from './components/orderList/OrderList';
import OrderList2 from './components/orderList/OrderList2';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div >
      <Header/>
      <Routes>
        <Route path='/' element={<Main />}/>
        {/* <Route path='/orders' element={<Order />}/> */}
        <Route path='/orders' element={<OrderList2 />}/>
        <Route path='/goodinfo' element={<GooodsInfo />} />
      </Routes>
      {/* <Main /> */}
      </div>
    </BrowserRouter>
  )
}

export default App
