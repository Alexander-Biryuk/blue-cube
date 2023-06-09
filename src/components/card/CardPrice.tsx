import { Typography } from '@mui/material';

function numberWithSpaces(n: number) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CardPrice({ price }: { price: number }) {
  return (
    <Typography
      variant='primaryFont'
      component='p'
      fontSize={'22px'}
      fontWeight={'800'}
      marginTop={'18px'}
    >
      {numberWithSpaces(price)} ₽
    </Typography>
  );
}
