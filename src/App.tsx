import './App.css';
import GooodsInfo from './components/goodsInfo/GoodsInfo';
import Header from './components/header/Header';
import Main from './components/main/Main';
// import OrderList from './components/orderList/OrderList';
import OrderList2 from './components/orderList/OrderList2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProducts } from './store/getProductsSlice';
// import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import NotFound from './components/404/NotFound';

function App() {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  const products = useAppSelector(state => state.products.products.data);
  
  
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          {/* <Route path='/orders' element={<Order />}/> */}
          <Route path='/orders' element={<OrderList2 />} />
          <Route path='/goodinfo/:id' element={<GooodsInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {/* <Main /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
