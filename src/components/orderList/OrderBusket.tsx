import { useAppDispatch } from '../../hooks';
import { getCart, updateCart } from '../../store/busketSlice';
import { ORDERS } from '../constants/constants';
import BusketBase from '../busket/BusketBase';
import OrdersBackButton from '../goodsInfo/GoodsBackButton';
import { useParams } from 'react-router-dom';
import type { Busket } from '../../types';

type PropType = { busket: Busket[] };

export default function OrderBusket({ busket }: PropType) {
  const { num } = useParams();
  const page = Number(num);

  const dispatch = useAppDispatch();

  function handleUpdate() {
    async function update() {
      await dispatch(updateCart(busket));
      await dispatch(getCart());
    }
    update();
  }

  return (
    <>
      <OrdersBackButton path={`${ORDERS + page}`} />
      <BusketBase
        regexp={/orders\/(\d+)/}
        data={busket}
        counter={false}
        handleButton={handleUpdate}
        buttonText='Повторить заказ?'
      />
    </>
  );
}
