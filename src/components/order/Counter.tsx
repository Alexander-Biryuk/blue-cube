import { Box, Button } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/busketSlice';

interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}

export default function Counter({ good }: {good: GoodType}) {
  const busket = useAppSelector(state => state.busket.data);
  const dispatch = useDispatch();
  console.log(busket);
  return (
    <Box width={'156px'} display={'flex'}>
      <Button
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
        {busket.filter(item => item.id === good.id).length}
      </Button>
      <Button
        onClick={() => dispatch(addToCart(good))}
        sx={{
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
        }}
      >
        +
      </Button>
    </Box>
  );
}
