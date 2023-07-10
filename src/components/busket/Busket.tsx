import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCart, updateCart } from '../../store/busketSlice';
import { submitCart } from '../../store/submitSlice';
import { selectBusketMemoized } from '../../selectors/selectors';
import { useEffect, useState } from 'react';
import BusketBase from './BusketBase';
import MySnackbar from '../snackbar/MySnackbar';

export default function Busket() {
  const dispatch = useAppDispatch();
  const [openOnSuccessSubmit, setOpenOnSuccessSubmit] = useState(false); // for snackbar

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const busket = useAppSelector(selectBusketMemoized);

  useEffect(() => {
    dispatch(updateCart(busket));
  }, [dispatch, busket]);

  function handleSubmit() {
    dispatch(submitCart());
    dispatch(getCart());
    setOpenOnSuccessSubmit(true);
  }

  return (
    <>
      <BusketBase
        regexp={/page\/(\d+)/}
        data={busket}
        counter={true}
        handleButton={handleSubmit}
        buttonText='Оформить заказ'
      />
      <MySnackbar
        open={openOnSuccessSubmit}
        setOpen={setOpenOnSuccessSubmit}
        message='Заказ оформлен'
      />
    </>
  );
}
