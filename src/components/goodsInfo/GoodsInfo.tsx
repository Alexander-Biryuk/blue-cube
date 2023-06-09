import { Container, Typography, Button } from '@mui/material';
import returnArrow from '../../assets/ReturnArrow.svg';
import styles from './GoodsInfo.module.scss';
import MyRating from '../rating/StyledRating';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import parse from 'html-react-parser';
import { addToCart } from '../../store/busketSlice';
import GoodsName from './GoodsName';
import GoodsPrice from './GoodsPrice';

function numberWithSpaces(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function GooodsInfo() {

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const products = useAppSelector((state) => state.products.products.data);
  const good = products.find((item) => item.id === id?.slice(1));

  //-----------to long title, need to cut it down to 2-3 words-------------
  let shortName = '';
  if (good !== undefined) {
    shortName = good.title;
    let i = 4;
    while (shortName.length > 22) {
      shortName = good?.title.split(' ').slice(0, i).join(' ');
      i--;
    }
  }

  const htmlContent = good?.description || '';

  return (
    <div className={styles.goodsInfo}>
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
        <img src={good?.picture} alt='photo' />
        <Container>
          
          <GoodsName shortName={shortName} />

          <MyRating stars={good?.rating as number} />

          <GoodsPrice price={good?.price as number} />
          <Button
            variant='contained'
            disableElevation
            color='primary'
            onClick={() => dispatch(addToCart(good))}
            sx={{
              backgroundColor: 'primary',
              textTransform: 'none',
              color: '#FFF',
              width: '346px',
              height: '52px',
              borderRadius: '12px',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '16px',
              mt: '8px',
              '&:hover': {
                // backgroundColor: 'primary.light'
                opacity: 0.8,
              },
            }}
          >
            Добавить в корзину
          </Button>
          {/* <MyButton>Добавить в корзину</MyButton> */}
          <Typography
            sx={{
              fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '16px',
              mt: '24px',
            }}
          >
            <img
              src={returnArrow}
              alt='return'
              style={{ marginRight: '10px' }}
            />
            Условия возврата
          </Typography>
          <Typography
            sx={{
              // fontFamily: 'Nunito',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              mt: '8px',
              color: '#172029',
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
      <Container
        sx={{
          width: '792px',
          // height: '269px',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          mt: '24px',
        }}
      >
        <Typography component={'p'} sx={{ fontWeight: 700, fontSize: '20px' }}>
          Описание
        </Typography>
        <Typography
          style={{ lineHeight: '20px' }}
          component={'div'}
          sx={{
            // fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            mt: '8px',
            color: '#172029',
          }}
        >
          {parse(htmlContent)}
        </Typography>
        {/* <div className={styles.description}>{parse(htmlContent)}</div> */}
      </Container>
    </div>
  );
}
