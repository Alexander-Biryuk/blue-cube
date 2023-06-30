import './App.css';
import GooodsInfo from './components/goodsInfo/GoodsInfo';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Page from './components/page/Page';
// import OrderList from './components/orderList/OrderList';
import OrderList2 from './components/orderList/OrderList2';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import NotFound from './components/404/NotFound';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { getCart } from './store/busketSlice';
import { HOME, PAGE, DESCRIPTION, ORDERS, NOT_FOUND } from './components/paths/paths';
// import { fetchProducts } from './store/getProductsSlice';

function App() {
  // let currentPage = Number(sessionStorage.getItem('page'))
  //   ? Number(sessionStorage.getItem('page'))
  //   : 1;
  // if (!currentPage) currentPage = 1;

  // const [page, setPage] = useState(currentPage);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts(currentPage));
  // }, [dispatch, currentPage]);
  // const products = useAppSelector((state) => state.products.products.data);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path={HOME} element={<Main />}>
            {/* <Route index element={<Page />}/> */}
            <Route path={PAGE + ':num'} element={<Page />}/>
          </Route>
          <Route path={PAGE + ':num' + DESCRIPTION + ':id'} element={<GooodsInfo />} />
          {/* <Route path='/orders' element={<Order />}/> */}
          <Route path={ORDERS} element={<OrderList2 />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
