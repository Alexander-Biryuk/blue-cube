import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid } from '@mui/material';
// import photo from '../../assets/Photo.png';
import styles from './GoodsCard.module.scss';
import { Link } from 'react-router-dom';
import MyRating from '../rating/MyRating';
import CardName from './CardName';
import CardPrice from './CardPrice';
// import { useSelector } from 'react-redux';

interface PropType {
  id: string;
  picture: string;
  name: string;
  rating: number;
  price: number;
}

export default function GoodsCard({ id, picture, name, rating, price }: PropType) {
  //----------cutting long title to 2 - 3 words------------
  let shortName = name;
  let i = 4;
  while (shortName.length > 22) {
    shortName = name.split(' ').slice(0, i).join(' ');
    i--;
  }
  return (
    <Grid item xs={1} display={'flex'} justifyContent={'center'}>
      <Card
        sx={{
          width: 250,
          height: 358,
          backgroundColor: '#fff',
          borderRadius: '16px',
          '&:hover': {
            color: '#fff',
            boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Link to={`/goodinfo/:${id}`} className={styles.links}>
          <CardActionArea style={{ color: '#fff' }}>
            <CardMedia component='img' height='250' width='250' image={picture} alt='photo' />
            <CardContent>
              <CardName name={shortName} />
              <MyRating stars={rating} />
              <CardPrice price={price} />
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
}
