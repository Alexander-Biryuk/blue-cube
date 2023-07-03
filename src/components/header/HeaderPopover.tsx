import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import styles from './Header.module.scss';
import cart from '../../assets/Cart.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Busket from '../busket/Busket';
import { selectBusketMemoized } from '../../selectors/selectors';
import { updateCart } from '../../store/busketSlice';

export default function HeaderPopover() {
  const goods = useAppSelector(selectBusketMemoized);
  //-----update cart----------
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateCart(goods))
  }, [dispatch, goods])
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        component='div'
      >
        <div className={styles.cart}>
          <img src={cart} alt='cart' />
          <span>Корзина</span> ({goods?.length})
        </div>
      </Typography>
      <Popover
        sx={{ borderRadius: '16px' }}
        id='mouse-over-popover'
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        <Busket />
      </Popover>
    </div>
  );
}
