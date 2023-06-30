import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToCart, removeFromCart, updateCart } from '../../store/busketSlice';
import styles from './GoodsInfo.module.scss';
import Counter from '../busket/Counter';
import trash from '../../assets/Trash.svg';
import MySnackbar from '../snackbar/MySnackbar';
import { useState } from 'react';
import { submitCart } from '../../store/ordersSlice';
import { getOrders } from '../../store/ordersSlice';

interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

export default function GoodsButton({ good }: { good: GoodType }) {
  const busket = useAppSelector((state) => state.busket);
  const dispatch = useAppDispatch();

  const [openOnOverSum, setOpenOnOverSum] = useState(false); // for snackbar

  const index = busket.findIndex((item) => item.product.id === good.id);

  const newBusketSum =
    busket.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0) + good.price;

  function handleAddToCartButton() {
    if (newBusketSum <= 10000) {
      dispatch(addToCart(good));
    } else {
      setOpenOnOverSum(true);
    }
  }
  //-------------make adding to cart button clickable for showing warning message if sum exceeds------------
  let addToCartButton = {};
  if (newBusketSum <= 10000) {
    addToCartButton = {
      backgroundColor: 'primary',
      textTransform: 'none',
      color: '#FFF',
      width: { xs: '100%', md: '346px' },
      height: '52px',
      borderRadius: '12px',
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '16px',
      mt: '8px',
      '&:hover': {
        opacity: 0.8,
      },
    };
  } else {
    addToCartButton = {
      backgroundColor: '#E6F1FC',
      textTransform: 'none',
      color: '#b3b3b3',
      width: { xs: '100%', md: '346px' },
      height: '52px',
      borderRadius: '12px',
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '16px',
      mt: '8px',
      '&:hover': {
        backgroundColor: '#E6F1FC',
      },
    };
  }
  return (
    <>
      {busket && busket.find((item) => item.product.id === good.id) ? (
        busket[index].quantity > 0 ? (
          <div className={styles.buttonContainer}>
            <Counter good={good} />
            <Button
              variant='contained'
              disableElevation
              color='primary'
              onClick={() => dispatch(submitCart())}
              sx={{
                backgroundColor: 'primary',
                textTransform: 'none',
                color: '#FFF',
                width: '182px',
                height: '52px',
                borderRadius: '12px',
                fontFamily: 'Nunito',
                fontWeight: 700,
                fontSize: '16px',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Оформить заказ
            </Button>
            <button onClick={() => dispatch(getOrders(1))}>get Orders</button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <Counter good={good} />
            <Button
              variant='contained'
              disableElevation
              onClick={() => dispatch(removeFromCart(good.id))}
              sx={{
                backgroundColor: '#fff',
                textTransform: 'none',
                color: '#FFF',
                width: '182px',
                height: '52px',
                borderRadius: '12px',
                fontFamily: 'Nunito',
                fontWeight: 700,
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#fff',
                  opacity: 0.8,
                },
              }}
            >
              <img src={trash} alt='delete' />
            </Button>
          </div>
        )
      ) : (
        <Button
          onMouseLeave={() => dispatch(updateCart(busket))}
          // disabled={newBusketSum > 10000}
          variant='contained'
          disableElevation
          color='primary'
          onClick={handleAddToCartButton}
          sx={addToCartButton}
        >
          Добавить в корзину
        </Button>
      )}
      <MySnackbar
        open={openOnOverSum}
        setOpen={setOpenOnOverSum}
        message='Сумма заказа не может превышать 10 000р :('
      />
    </>
  );
}
