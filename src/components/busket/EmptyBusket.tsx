import { Box, Typography } from '@mui/material';

export default function EmptyBusket() {
  return (
    <Box width={'100%'} margin={'0 auto'} display={'flex'} justifyContent={'center'}>
      <Typography fontSize={'24px'}>Корзина пуста</Typography>
    </Box>
  );
}
