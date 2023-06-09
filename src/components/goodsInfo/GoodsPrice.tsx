import { Typography } from '@mui/material';

export default function GoodsPrice({ price }: { price: number }) {
  function numberWithSpaces(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return (
    <Typography
      sx={{
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '28px',
        mt: '20px',
      }}
    >
      {/* 6 199 ₽ */}
      {numberWithSpaces(price)} ₽
    </Typography>
  );
}
