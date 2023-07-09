import {Box} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks';
import { selectOrdersMemoized } from '../../selectors/selectors';
import OrderBusket from './OrderBusket';

export default function OrderDetails() {
  const {num, index} = useParams();
  console.log(num, index)
  const page = Number(num);
  // const busketIndex = Number(index) - 1;

  const orders = useAppSelector(selectOrdersMemoized);
  // const busketIndex = orders.data.length - Number(index) - 1;
  const busketIndex = Number(index);
  const busket = orders.data[busketIndex];
  console.log(busket);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      width={'100%'}
      minHeight={'calc(100vh - 48px)'}
      height={'100%'}
      padding={'24px'}
      bgcolor={'#F2F6FA'}
    >
      <OrderBusket busket={busket}/>
    </Box>
  )
}