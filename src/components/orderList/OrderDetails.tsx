import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectOrdersMemoized } from '../../selectors/selectors';
import OrderBusket from './OrderBusket';

export default function OrderDetails() {
  const { index } = useParams();

  const orders = useAppSelector(selectOrdersMemoized);
  const busketIndex = Number(index);
  const busket = orders.data[busketIndex];

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
      <OrderBusket busket={busket} />
    </Box>
  );
}
