import { Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import cube from '../../assets/Cube.svg';

import styles from './Header.module.scss';
import HeaderPopover from './HeaderPopover';
import { ORDERS, PAGE } from '../constants/constants';

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Toolbar
        className={styles.header}
        style={{ minHeight: '48px' }}
        sx={{
          bgcolor: '#F2F6FA',
          boxShadow: 'none',
          borderBottom: '1px solid #E6F1FC',
        }}
      >
        <img src={logo} alt='logo' className={styles.logo} />
        <img src={cube} alt='logo' className={styles.shortLogo} />
        <div className={styles.menuItems}>
          <NavLink
            to={PAGE + '1'}
            className={styles.links}
            style={({ isActive }) => {
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
            to={ORDERS + 1}
            className={styles.links}
            style={({ isActive }) => {
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
        <HeaderPopover />
      </Toolbar>
    </header>
  );
}
