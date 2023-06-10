import { Typography } from '@mui/material';
import returnArrow from '../../assets/ReturnArrow.svg';

export default function GoodsReturnConditions() {
  return (
    <>
      <Typography
        sx={{
          fontFamily: 'Nunito',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '16px',
          mt: '24px',
        }}
      >
        <img src={returnArrow} alt='return' style={{ marginRight: '10px' }} />
        Условия возврата
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Nunito',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '20px',
          mt: '8px',
          color: '#172029',
        }}
      >
        Обменять или вернуть товар надлежащего качества можно в течение 14 дней
        с момента покупки.
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Nunito',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '12px',
          color: '#808080',
          mt: '16px',
        }}
      >
        Цены в интернет-магазине могут отличаться от розничных магазинов.
      </Typography>
    </>
  );
}
