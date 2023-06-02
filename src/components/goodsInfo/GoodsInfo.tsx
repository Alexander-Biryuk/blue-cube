import { Container, Typography, Rating, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import photo from '../../assets/Photo.png';
import star from '../../assets/Star.svg';
import emptyStar from '../../assets/EmptyStar.svg';
import returnArrow from '../../assets/ReturnArrow.svg';
// import styles from './GoodsInfo.module.scss'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FABC22',
  },
  '& .MuiRating-iconHover': {
    color: '#FABC22',
  },
});

export default function GooodsInfo() {
  return (
    <Container
      sx={{
        width: '792px',
        height: '422px',
        display: 'flex',
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      {/* <Container> */}
      <img src={photo} alt='photo' />
      {/* </Container> */}
      <Container>
        <Typography
          sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '28px',
          }}
        >
          Куртка Lassie
        </Typography>
        <StyledRating
          name='customized-color'
          size='large'
          sx={{ width: '100px' }}
          defaultValue={5}
          getLabelText={(value) => `${value} star${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={
            <img src={star} style={{ width: '12px', marginRight: '4px' }} />
          }
          emptyIcon={
            <img
              src={emptyStar}
              style={{ width: '12px', marginRight: '4px' }}
            />
          }
        />
        <Typography
          sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '28px',
            mt: '20px'
          }}
        >
          6 199 ₽
        </Typography>
        <Button variant="contained" disableElevation 
          sx={{
            backgroundColor: '#0073E6',
            textTransform: 'none',
            color: '#FFF',
            width: '346px',
            height: '52px',
            borderRadius: '12px',
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '16px',
            mt: '8px',
            '& hover': {
              backgroundColor: '#0073E6'
            }
          }}
        >
          Добавить в корзину
        </Button>
        <Typography
          sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            mt: '24px',
          }}
        >
          <img src={returnArrow} alt='return' />
          Условия возврата
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            mt: '8px',
          }}
        >
          Обменять или вернуть товар надлежащего качества можно в течение 14
          дней с момента покупки.
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
      </Container>
    </Container>
  );
}
