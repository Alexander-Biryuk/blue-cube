import { Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addToCart, removeFromCart, updateCart } from '../../store/busketSlice';
import MySnackbar from '../snackbar/MySnackbar';
import { useState } from 'react';

interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

export default function Counter({ good }: { good: GoodType }) {
  // state for warning snackbar
  const [openOnOver10, setOpenOnOver10] = useState(false);
  const [openOnOverSum, setOpenOnOverSum] = useState(false);

  const busket = useAppSelector((state) => state.busket);
  const dispatch = useAppDispatch();

  const itemCount = busket.find((item) => item.product.id === good.id)?.quantity;
  const newBusketSum =
    busket.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0) + good.price;

  const makeMinusDisable: boolean = itemCount !== undefined && itemCount < 1;

  //--------make plus button disable but clickable if itemsCount > 10 or busketSum > 10000--------
  let plusButtonSx = {};
  if (itemCount !== undefined && (itemCount >= 10 || newBusketSum > 10000)) {
    plusButtonSx = {
      backgroundColor: '#E6F1FC',
      color: '#b3b3b3',
      fontWeight: 700,
      fontSize: '30px',
      minWidth: '52px',
      width: '52px',
      height: '52px',
      borderRadius: '0px 12px 12px 0px',
      '&:hover': {
        backgroundColor: '#E6F1FC',
        cursor: 'default',
      },
    };
  } else {
    plusButtonSx = {
      backgroundColor: '#E6F1FC',
      color: '#0073E6',
      fontWeight: 700,
      fontSize: '30px',
      minWidth: '52px',
      width: '52px',
      height: '52px',
      borderRadius: '0px 12px 12px 0px',
      '&:hover': {
        backgroundColor: '#99C7F5',
      },
    };
  }
  //---------------------------------------------------------------------------

  function handlePlus() {
    if (itemCount !== undefined && itemCount < 10 && newBusketSum < 10000) {
      dispatch(addToCart(good));
    }

    if (itemCount !== undefined && itemCount >= 9) {
      setOpenOnOver10(true);
    }

    if (newBusketSum > 10000) {
      setOpenOnOverSum(true);
    }
  }

  return (
    <div onMouseLeave={() => dispatch(updateCart(busket))}>
      <Box width={'156px'} display={'flex'}>
        <Button
          disabled={makeMinusDisable}
          onClick={() => dispatch(removeFromCart(good.id))}
          sx={{
            backgroundColor: '#E6F1FC',
            color: '#0073E6',
            fontWeight: 700,
            fontSize: '30px',
            minWidth: '52px',
            width: '52px',
            height: '52px',
            borderRadius: '12px 0px 0px 12px',
            '&:hover': {
              backgroundColor: '#99C7F5',
            },
          }}
        >
          -
        </Button>

        <Button
          sx={{
            backgroundColor: '#E6F1FC',
            cursor: 'default',
            color: '#172029',
            fontWeight: 700,
            fontSize: '16px',
            minWidth: '52px',
            width: '52px',
            height: '52px',
            '&:hover': {
              backgroundColor: '#99C7F5',
            },
          }}
        >
          {itemCount}
        </Button>

        <Button onClick={handlePlus} sx={plusButtonSx}>
          +
        </Button>
      </Box>
      <MySnackbar open={openOnOver10} setOpen={setOpenOnOver10} message='Больше 10 нельзя :(' />
      <MySnackbar
        open={openOnOverSum}
        setOpen={setOpenOnOverSum}
        message='Сумма заказа не может превышать 10 000р :('
      />
    </div>
  );
}
