import { Box, Grid, Container } from '@mui/material';
import GoodsCard from '../card/GoodsCard';
import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles.main}>
      <Box display={'flex'} justifyContent={'center'} pt={'24px'}>
      {/* <Container style={{maxWidth: '1346px', padding: '24px 0px'}} > */}
        <Grid container columnSpacing={'24px'} columns={5} maxWidth={'1346px'}>
          <GoodsCard /> 
          <GoodsCard /> 
          <GoodsCard /> 
          <GoodsCard /> 
          <GoodsCard /> 
        </Grid>
      {/* </Container> */}
      </Box>
    </div>
  );
}
