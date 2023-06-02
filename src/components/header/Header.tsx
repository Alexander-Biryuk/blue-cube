import { AppBar, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import cart from '../../assets/Cart.svg';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header>
      {/* <AppBar
        position='static'
        sx={{
          bgcolor: '#F2F6FA',
          boxShadow: 'none',
          borderBottom: '1px solid #E6F1FC',
        }}
      > */}
      <Toolbar
        className={styles.header}
        sx={{
          bgcolor: '#F2F6FA',
          boxShadow: 'none',
          borderBottom: '1px solid #E6F1FC',
        }}
      >
        <img src={logo} alt='logo' />
        <div className={styles.menuItems}>
          {/* <Link className={styles.links} href='#' underline='hover'>
            Товары
          </Link> */}
          {/* <Link href='#' underline='hover' sx={{textDecorationThickness: '5px'}}>
            Заказы
          </Link> */}
          <NavLink
            to='/'
            className={styles.links}
            style={({ isActive, isPending }) => {
              return {
                textDecorationLine: isActive ? 'underline' : 'none',
                textDecorationThickness: isActive ? '3px' : 'none',
                textUnderlineOffset: isActive ? '25px' : 'none',
                color: isActive ? '#0073E6' : '#172029',
              };
            }}
          >
            Товары
          </NavLink>
          <NavLink
            to='/orders'
            className={styles.links}
            style={({ isActive, isPending }) => {
              return {
                textDecorationLine: isActive ? 'underline' : 'none',
                textDecorationThickness: isActive ? '3px' : 'none',
                textUnderlineOffset: isActive ? '25px' : 'none',
                color: isActive ? '#0073E6' : '#172029',
              };
            }}
          >
            Заказы
          </NavLink>
        </div>
        <div className={styles.cart}>
          <img src={cart} alt='cart' />
          Корзина
        </div>
      </Toolbar>
      {/* </AppBar> */}
    </header>
  );
}
