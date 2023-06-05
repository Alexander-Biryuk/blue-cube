import { AppBar, Container, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import cart from '../../assets/Cart.svg';

import styles from './Header.module.scss';
import HeaderPopover from './HeaderPopover';

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
        style={{minHeight: '48px'}}
        sx={{
          bgcolor: '#F2F6FA',
          boxShadow: 'none',
          borderBottom: '1px solid #E6F1FC',
        }}
      >
        <img src={logo} alt='logo' className={styles.logo}/>
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
                textUnderlineOffset: isActive ? '16px' : 'none',
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
                textUnderlineOffset: isActive ? '16px' : 'none',
                color: isActive ? '#0073E6' : '#172029',
              };
            }}
          >
            Заказы
          </NavLink>
        </div>
        {/* <div className={styles.cart}>
          <img src={cart} alt='cart' />
          Корзина
        </div> */}
        <HeaderPopover />
      </Toolbar>
      {/* </AppBar> */}
    </header>
  );
}
