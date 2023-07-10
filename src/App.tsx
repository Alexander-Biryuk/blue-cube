import './App.css';
import GooodsInfo from './components/goodsInfo/GoodsInfo';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Page from './components/main/Page';
import OrderList2 from './components/orderList/OrderList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/404/NotFound';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { getCart } from './store/busketSlice';
import {
  HOME,
  PAGE,
  DESCRIPTION,
  ORDERS,
  ORDER_DETAILS,
  NOT_FOUND,
} from './components/constants/constants';
import OrderDetails from './components/orderList/OrderDetails';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path={HOME} element={<Main />}>
            <Route path={PAGE + ':num'} element={<Page />} />
          </Route>
          <Route path={PAGE + ':num' + DESCRIPTION + ':id'} element={<GooodsInfo />} />
          <Route path={ORDERS + ':num'} element={<OrderList2 />} />
          <Route path={ORDERS + ':num' + ORDER_DETAILS + ':index'} element={<OrderDetails />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
