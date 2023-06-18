import { Box, Typography } from '@mui/material';
import backArrow from '../../assets/BackArrow.svg';
import { useNavigate } from 'react-router-dom';

export default function GoodsBackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box
      onClick={goBack}
      display={'flex'}
      width={'73px'}
      justifyContent={'space-between'}
      position={'fixed'}
      left={'34px'}
      sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
    >
      <img src={backArrow} alt='arrow' />
      <Typography variant='secondaryFont' color={'#0073E6'}>
        Назад
      </Typography>
    </Box>
  );
}
