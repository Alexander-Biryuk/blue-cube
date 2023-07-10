import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToCart, getCart, removeFromCart, updateCart } from '../../store/busketSlice';
import styles from './GoodsInfo.module.scss';
import Counter from '../counter/Counter';
import trash from '../../assets/Trash.svg';
import MySnackbar from '../snackbar/MySnackbar';
import { useState, useEffect } from 'react';
import { submitCart } from '../../store/submitSlice';
import { selectBusketMemoized } from '../../selectors/selectors';
import type { GoodType } from '../../types';

export default function GoodsButton({ good }: { good: GoodType }) {
  const busket = useAppSelector(selectBusketMemoized);
  const dispatch = useAppDispatch();

  const [openOnOverSum, setOpenOnOverSum] = useState(false); // for snackbar
  const [openOnSuccessSubmit, setOpenOnSuccessSubmit] = useState(false); // for snackbar

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

  useEffect(() => {
    dispatch(updateCart(busket));
  }, [dispatch, busket]);

  let submitMessage = 'Заказ оформлен';
  function handleSubmit() {
    dispatch(submitCart());
    dispatch(getCart());
    setOpenOnSuccessSubmit(true);
  }
  const submitError = useAppSelector((state) => state.submit.error);
  if (submitError) submitMessage = 'Ошибка сервера';

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
              onClick={handleSubmit}
              sx={{
                ml: '8px',
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
      <MySnackbar
        open={openOnSuccessSubmit}
        setOpen={setOpenOnSuccessSubmit}
        message={submitMessage}
      />
    </>
  );
}
